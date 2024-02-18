import {useEffect, useState} from "react";
import {TextField, Button, Paper} from '@mui/material';
import {diseaseService} from "../../services";
import {useAuth} from "../../hooks/useAuth";

const POLLING_FREQUENCY_MS = 1000;

const AnalyseBot = () => {
    const user = useAuth().getUser()

    const [fetching, setFetching] = useState(false);
    const [userThread, setUserThread] = useState();
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [sending, setSending] = useState(false);
    const [pollingRun, setPollingRun] = useState(false);

    const fetchMessages = async () => {
        if (!userThread) return;

        setFetching(true);

        try {
            const response = await diseaseService.getMessages(userThread.threadId);

            if (!response.data.messages) {
                console.error(response.data.error ?? "Unknown error");
                return;
            }

            let newMessages = response.data.messages;

            newMessages = newMessages
                .sort((a, b) =>
                    new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
                .filter(message => message.content[0].type === "text"
                    && message.content[0].text.value.trim() !== "")

            setMessages(newMessages);
        } catch (e) {
            console.log(e);
            setMessages([]);
        } finally {
            setFetching(false)
        }

    };

    useEffect(() => {
        const getUserThread = async () => {
            try {
                const {data} = await diseaseService.getUserThread(user._id);
                setUserThread(data.userThread);
            } catch (e) {
                console.log(e);
            }
        }

        getUserThread();
    }, []);

    useEffect(() => {
        const intervalId = setInterval(fetchMessages, POLLING_FREQUENCY_MS);

        return () => clearInterval(intervalId);
    }, [fetchMessages]);

    const startRun = async () => {
        try {
            const {data: {run}} = await diseaseService.createRun(userThread.threadId);

            if (!run) {
                return "";
            }

            return run.id;
        } catch (e) {
            console.log(e);
            return "";
        }
    }

    const pollRunStatus = async (runId) => {
        setPollingRun(true);

        const intervalId = setInterval(async () => {
            try {
                const {data: {run}} = await diseaseService.retrieveRun(userThread.threadId, runId);

                if (!run) {
                    return;
                }

                if (run.status === "completed") {
                    clearInterval(intervalId);
                    setPollingRun(false);
                    fetchMessages();
                    return;
                } else if (run.status === "failed") {
                    clearInterval(intervalId);
                    setPollingRun(false);
                    return;
                }
            } catch (e) {
                console.log(e);
                clearInterval(intervalId);
            }
        }, POLLING_FREQUENCY_MS);

        return () => clearInterval(intervalId);
    }

    const sendMessage = async () => {
        if (sending) {
            return;
        }

        setSending(true);

        try {
            const newMessage = await diseaseService.createMessage(userThread.threadId, {message, fromUser: "true"});

            if (!newMessage) {
                console.error("No message returned");
                return;
            }
            console.log(newMessage)

            setMessages((prev) => [...prev, newMessage]);
            setMessage("");

            const runId = await startRun();
            if (!runId) {
                return;
            }

            pollRunStatus(runId);
        } catch (e) {
            console.log(e);
        } finally {
            setSending(false);
        }
    }

    return (
        <Paper style={{
            width: '100%',
            height: 'calc(100vh - 64px)',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'white',
            color: 'black'
        }}>
            {/* MESSAGES */}
            <div style={{
                flexGrow: 1,
                overflowY: 'scroll',
                padding: '8px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
            }}>

                {fetching && messages.length === 0 && (
                    <div style={{textAlign: 'center', fontWeight: 'bold'}}>Fetching...</div>
                )}

                {messages.length === 0 && !fetching && (
                    <div style={{textAlign: 'center', fontWeight: 'bold'}}>No messages.</div>
                )}

                {messages.map((message) => (
                    <div
                        key={message.id}
                        style={{
                            padding: '8px',
                            marginBottom: '8px',
                            borderRadius: '8px',
                            width: 'fit-content',
                            fontSize: '1rem',
                            backgroundColor: ["true", "True"].includes(message?.metadata?.fromUser ?? "") ? '#15e67a' : 'skyblue',
                                marginLeft: 'auto',
                        }}
                    >
                        {message && message.content && message.content[0].type === 'text'
                            ? message.content[0].text.value.split('\n').map((text, index) => <p key={index}>{text}</p>)
                            : null}
                    </div>
                ))}
            </div>

            <div style={{marginTop: 'auto', padding: '16px'}}>
                <div style={{display: 'flex', alignItems: 'center', backgroundColor: 'ghostwhite', padding: '8px'}}>
                    <TextField
                        type="text"
                        fullWidth
                        variant="outlined"
                        placeholder="Type a message..."
                        value={message}
                        onChange={(e) => {
                            e.preventDefault();
                            setMessage(e.target.value);
                        }}
                        style={{flexGrow: 1, backgroundColor: 'transparent'}}
                    />
                    <Button
                        disabled={sending || !message.trim()}
                        variant="contained"
                        color="primary"
                        style={{marginLeft: '8px', borderRadius: '999px'}}
                        onClick={sendMessage}
                    >
                        {sending ? "Sending..." : pollingRun ? "Polling Run..." : "Send"}
                    </Button>
                </div>
            </div>
        </Paper>
    );
}

export default AnalyseBot;