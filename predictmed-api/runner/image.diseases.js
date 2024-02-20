const {constants} = require("../constants");

module.exports.imageDiseases = [
    {
        name: "lung_colon",
        type: 'IMAGE',
        photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS07jS-VDee8G3aDP_RY1PFvh7uI-MFYiSMCQ&usqp=CAU",
        apiPath: `${constants.FASTAPI_CONNECTION_URL}/lung_colon/predict`,
        description: "Lung cancer refers to the uncontrolled growth of abnormal cells in the lungs. It is one of the leading causes of cancer-related deaths globally." +
            "Colon cancer, also known as colorectal cancer, involves the development of cancerous cells in the colon or rectum.",
        partsOfTheBody: ["chest", "stomach"],
        diseases: ["Lung", "Colon"],
        fields: [
            {
                name: "Lung or colon",
                fieldName: "file",
                dataType: "file",
                description: "Provide lung or colon histopathological image",
            }
        ]
    },
    {
        name: "diseases",
        type: 'IMAGE',
        photo: "data:image/jpeg;base64,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",
        apiPath: `${constants.FASTAPI_CONNECTION_URL}/disease/predict`,
        description: "Diseases encompass a broad spectrum of health conditions, ranging from cardiovascular issues like heart disease to neurodegenerative disorders such as Alzheimer's. Influenced by a combination of genetic, environmental, and lifestyle factors, diseases manifest in diverse ways, affecting various organs and systems throughout the body.",
        partsOfTheBody: ["chest", "head", "leftArm", "leftFoot", "leftHand", "leftHand", "leftLeg", "leftShoulder",
            "rightArm", "rightFoot", "rightHand", "rightLeg", "rightShoulder", "stomach"],
        diseases: ['Acne', 'Actinic Keratosis',
            'Chromhidrosis', 'Eruptive Xanthomas', 'Erythrasma',
            'Impetigo', 'Keratosis Pilaris', 'Leprosy', 'Lupus', 'Lyme Disease',
            'Measles', 'Melanoma', 'Melasma', 'Otophyma', 'RingWorm',
            'Shingles', 'Solar Lentigo', 'Dermatofibroma', 'Eczema', 'Hives', 'Psoriasis',
            'Rosacea', 'Scabies'],
        fields: [
            {
                name: "Diseases",
                fieldName: "file",
                dataType: "file",
                description: "Provide the image of one of this: 'Acne', 'Actinic Keratosis'," +
                    "           'Chromhidrosis', 'Eruptive Xanthomas', 'Erythrasma'," +
                    "           'Impetigo', 'Keratosis Pilaris', 'Leprosy', 'Lupus', 'Lyme Disease'," +
                    "           'Measles', 'Melanoma', 'Melasma', 'Otophyma', 'RingWorm', 'Scabies2'," +
                    "           'Shingles', 'Solar Lentigo', 'dermatofibroma', 'eczema', 'hives', 'psoriasis'," +
                    "           'rosacea', 'scabies' ",
            }
            ]
    },

    {
        name: "Multi_diseases",
        type: 'IMAGE',
        photo: "data:image/jpeg;base64,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",
        apiPath: `${constants.FASTAPI_CONNECTION_URL}/multi_disease/predict`,
        description: "Diseases are pathological conditions that disrupt the normal functioning of the body's organs or systems, often causing physical or mental impairment. They can result from various factors, including genetic predisposition, environmental influences, and lifestyle choices, and may require medical intervention for diagnosis, treatment, and management.",
        partsOfTheBody: ["chest", "head", "leftArm", "leftFoot", "leftHand", "leftHand", "leftLeg", "leftShoulder",
            "rightArm", "rightFoot", "rightHand", "rightLeg", "rightShoulder", "stomach"],
        diseases: ['Brain - Alzheimer MildDemented',
            "Brain - Alzheimer ModerateDemented",
            "Brain - Alzheimer NonDemented",
            "Brain - Alzheimer VeryMildDemented",
            "Brain - No  Brain Tumor",
            "Brain - glioma Brain Tumor",
            "Brain - meningioma Brain Tumor",
            "Brain - pituitary Brain Tumor",
            "Chest - Covid19",
            "Chest - Lung Opacity",
            "Chest - Normal",
            "Chest - Pneumonia",
            "RF - AMD",
            "RF - Cataract",
            "RF - Glaucoma",
            "RF - Hypertensive Retinopathy",
            "RF - Mild DR",
            "RF - Moderate DR",
            "RF - Normal Fundus",
            "RF - Proliferate DR",
            "RF - Severe DR",
            "Skin - akiec",
            "Skin - bcc",
            "Skin - bkl",
            "Skin - df",
            "Skin - mel",
            "Skin - nv",
            "Skin - vasc"],
        fields: [
            {
                name: "Diseases",
                fieldName: "file",
                dataType: "file",
                description: "Provide the image of one of this: Brain - Alzheimer MildDemented, " +
                "Brain - Alzheimer ModerateDemented, " +
                "Brain - Alzheimer NonDemented, " +
                "Brain - Alzheimer VeryMildDemented, " +
                "Brain - No  Brain Tumor, " +
                "Brain - glioma Brain Tumor, " +
                "Brain - meningioma Brain Tumor, " +
                "Brain - pituitary Brain Tumor, " +
                "Chest - Covid19, " +
                "Chest - Lung Opacity, " +
                "Chest - Normal, " +
                "Chest - Pneumonia, " +
                "RF - AMD, " +
                "RF - Cataract, " +
                "RF - Glaucoma, " +
                "RF - Hypertensive Retinopathy, " +
                "RF - Mild DR, " +
                "RF - Moderate DR, " +
                "RF - Normal Fundus, " +
                "RF - Proliferate DR, " +
                "RF - Severe DR, " +
                "Skin - akiec, " +
                "Skin - bcc, " +
                "Skin - bkl, " +
                "Skin - df, " +
                "Skin - mel, " +
                "Skin - nv, " +
                "Skin - vasc"
            }
        ]
    },
    {
        name: "Skin_diseases",
        type: 'IMAGE',
        photo: "https://preview.free3d.com/img/2014/06/2206001539091269572/jttdu3p2.jpg",
        apiPath: `${constants.FASTAPI_CONNECTION_URL}/skin_diseases/predict`,
        description: "Skin diseases encompass a diverse range of conditions affecting the skin's structure and function, leading to symptoms such as rashes, itching, and discoloration. These disorders can arise from factors like infections, allergies, autoimmune reactions, or environmental exposures, and their management often involves dermatological care and tailored treatment approaches.",
        partsOfTheBody: ["chest", "head", "leftArm", "leftFoot", "leftHand", "leftHand", "leftLeg", "leftShoulder",
            "rightArm", "rightFoot", "rightHand", "rightLeg", "rightShoulder", "stomach"],
        diseases: ['Acne', 'Hairloss','Nail Fungus','Normal','Skin allergy'],
        fields: [
            {
                name: "Skin diseases",
                fieldName: "file",
                dataType: "file",
                description: "Provide the image of one of this: Acne, Hairloss, Nail Fungus, Normal, Skin allergy "
            }
        ]
    },
    {
        name: "Skin_diseases_2",
        type: 'IMAGE',
        photo: "https://preview.free3d.com/img/2020/06/2374263569211459366/grukxt1x.jpg",
        apiPath: `${constants.FASTAPI_CONNECTION_URL}/skin2_diseases/predict`,
        description: "Skin diseases comprise a wide spectrum of conditions affecting the skin, ranging from common issues like eczema and acne to more severe conditions such as psoriasis and melanoma. These disorders can result from various causes, including infections, genetics, autoimmune reactions, or environmental factors, requiring diverse approaches for diagnosis and treatment by dermatologists.",
        partsOfTheBody: ["chest", "head", "leftArm", "leftFoot", "leftHand", "leftHand", "leftLeg", "leftShoulder",
            "rightArm", "rightFoot", "rightHand", "rightLeg", "rightShoulder", "stomach"],
        diseases: ['Akne', 'Benign','Enfeksiyonel','Malign','Ekzama', 'Pigment'],
        fields: [
            {
                name: "Skin diseases",
                fieldName: "file",
                dataType: "file",
                description: "Provide the image of one of this: Akne, Benign, Enfeksiyonel, Malign, Ekzama, Pigment "
            }
        ]
    },
    {
        name: "Skin_diseases_3",
        type: 'IMAGE',
        photo: "https://preview.free3d.com/img/2019/08/2273114279165035982/pac0es1d.jpg",
        apiPath: `${constants.FASTAPI_CONNECTION_URL}/skin3_diseases/predict`,
        description: "Diseases encompass a broad spectrum of health conditions, ranging from cardiovascular issues like heart disease to neurodegenerative disorders such as Alzheimer's. Influenced by a combination of genetic, environmental, and lifestyle factors, diseases manifest in diverse ways, affecting various organs and systems throughout the body.",
        partsOfTheBody: ["chest", "head", "leftArm", "leftFoot", "leftHand", "leftHand", "leftLeg", "leftShoulder",
            "rightArm", "rightFoot", "rightHand", "rightLeg", "rightShoulder", "stomach"],
        diseases: ['Eczema', 'Melanoma','Atopic Dermatitis','Basal Cell Carcinoma (BCC)',
            'Melanocytic Nevi (NV)', 'Enign Keratosis-like Lesions (BKL)',
            'Psoriasis pictures Lichen Planus and related diseases',
            'Seborrheic Keratoses and other Benign Tumors',
            'Tinea Ringworm Candidiasis and other Fungal Infections',
            'Warts Molluscum and other Viral Infections'],
        fields: [
            {
                name: "Skin diseases",
                fieldName: "file",
                dataType: "file",
                description: "Provide the image of one of this: Eczema, Melanoma, Atopic Dermatitis " +
                    "Basal Cell Carcinoma (BCC), " +
                    "Melanocytic Nevi (NV), enign Keratosis-like Lesions (BKL)" +
                    "Psoriasis pictures Lichen Planus and related diseases, " +
                    "Seborrheic Keratoses and other Benign Tumors" +
                    "Tinea Ringworm Candidiasis and other Fungal Infections" +
                    "Warts Molluscum and other Viral Infections "
            }
        ]
    },
    {
        name: "okular",
        type: 'IMAGE',
        photo: "https://domf5oio6qrcr.cloudfront.net/medialibrary/7349/7ae782c0-24f9-4128-97a9-8b64432bce76.jpg",
        apiPath: `${constants.FASTAPI_CONNECTION_URL}/okular/predict`,
        description: "Eye diseases encompass a wide range of conditions affecting the visual system. These can include disorders such as glaucoma, cataracts, and macular degeneration, each presenting unique challenges to vision and often requiring specialized medical attention.\n",
        partsOfTheBody: ["head"],
        diseases: ['Normal', 'Cataract','Diabetes','Glaucoma','Hypertension', 'Myopia', 'Age Issues', 'Other'],
        fields: [
            {
                name: "Okular diseases",
                fieldName: "file",
                dataType: "file",
                description: "Provide the image of retina of the eye"
            }
        ]
    },
    {
        name: "alzheimer_disease",
        type: 'IMAGE',
        photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzzX0np7LnAuL49JcDqhJm5XHNdBYTykbJaw&usqp=CAU",
        apiPath: `${constants.FASTAPI_CONNECTION_URL}/alzheimer_disease/predict`,
        description: "Alzheimer's disease is a progressive neurological disorder that primarily affects cognitive functions, leading to memory loss, impaired thinking, and behavioral changes. It is the most common cause of dementia, impacting millions of people worldwide and posing significant challenges for both patients and their families.",
        partsOfTheBody: ["head"],
        diseases: ['Mild_Demented', 'Moderate_Demented', 'Non_Demented', 'Very_Mild_Demented'],
        fields: [
            {
                name: "Alzheimer diseases",
                fieldName: "file",
                dataType: "file",
                description: "Provide the image of MRI of the head"
            }
        ]
    },
    {
        name: "x_ray_diseases",
        type: 'IMAGE',
        photo: "data:image/jpeg;base64,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",
        apiPath: `${constants.FASTAPI_CONNECTION_URL}/x_ray/predict`,
        description: " Infection of the lung tissue causing inflammation and respiratory symptoms, commonly presenting with cough and difficulty breathing. Abnormal lateral curvature of the spine, often diagnosed during adolescence and may cause posture changes or discomfort. ",
        partsOfTheBody: ["chest", "leftArm", "leftHand", "leftHand", "leftShoulder",
            "rightArm", "rightHand", "rightShoulder", "stomach", "head"],
        diseases: ["Pneumonia",
            "Pneumosclerosis",
            "Atherosclerosis of the aorta",
            "Post inflammatory changes",
            "Hydrothorax",
            "Cardiomegaly",
            "Tuberculosis",
            "Ards",
            "Hydropneumothorax",
            "Venous_congestion",
            "Emphysema",
            "Abscess",
            "Post traumatic ribs deformation",
            "Sarcoidosis",
            "Scoliosis",
            "Atelectasis",
            "Fracture"],
        fields: [
            {
                name: "X-ray diseases",
                fieldName: "file",
                dataType: "file",
                description: "Provide the image of x-ray of the body"
            }
        ]
    },
    {
        name: "malaria",
        type: 'IMAGE',
        photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1LLSOGBFrrcV4PoBJZmYMcSbVtsPC250G5A&usqp=CAU",
        apiPath: `${constants.FASTAPI_CONNECTION_URL}/malaria/predict`,
        description: "Malaria is a life-threatening infectious disease caused by parasites transmitted to humans through the bites of infected female mosquitoes. Symptoms include fever, chills, and flu-like illness, and it can be a severe condition if not promptly diagnosed and treated.",
        partsOfTheBody: ["chest", "head", "leftArm", "leftFoot", "leftHand", "leftHand", "leftLeg", "leftShoulder",
            "rightArm", "rightFoot", "rightHand", "rightLeg", "rightShoulder", "stomach"],
        diseases: ['Malaria'],
        fields: [
            {
                name: "Malaria disease",
                fieldName: "file",
                dataType: "file",
                description: "Provide the image of malaria cell"
            }
        ]
    },
];