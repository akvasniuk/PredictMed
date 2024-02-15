const {constants} = require("../constants");

module.exports.textDiseases = [
    {
        name: "heart",
        type: 'TEXT',
        photo: "https://www.verywellhealth.com/thmb/35nlCDqhyyn-X8nAFh8ullwtysc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/iStock-505082275-5873fa4c5f9b584db369b2e4.jpg",
        apiPath: `${constants.FASTAPI_CONNECTION_URL}/heart/predict`,
        description: "Heart diseases, also known as cardiovascular diseases, encompass a range of conditions that affect the heart and blood vessels. These conditions can negatively impact the heart's ability to function properly and may lead to serious health complications.",
        partsOfTheBody: ["chest"],
        fields: [
            {
                name: "Age",
                fieldName: "age",
                dataType: "number",
                description: "The age of the individual",
                constraints: [{
                    "max": 150,
                    "min": 10
                }]
            },
            {
                name: "Sex",
                fieldName: "sex",
                dataType: "number",
                description: "The gender of the individual (1 = male, 0 = female)",
                constraints: [{
                    "max": 1,
                    "min": 0
                }]
            },
            {
                name: "Chest Pain types",
                fieldName: "cp",
                dataType: "number",
                description: "Chest Pain types (cp): 0: Typical angina (chest pain related to decreased blood supply to the heart)" +
                    "1: Atypical angina." +
                    "2: Non-anginal pain." +
                    "3: Asymptomatic.",
                constraints: [{
                    "max": 3,
                    "min": 0
                }]
            },
            {
                name: "Resting Blood Pressure",
                fieldName: "trestbps",
                dataType: "number",
                description: "Resting Blood Pressure: The resting blood pressure of the individual",
                constraints: [{
                    "max": 200,
                    "min": 50
                }]
            },
            {
                name: "Serum Cholesterol",
                fieldName: "chol",
                dataType: "number",
                description: "Serum cholesterol level",
                constraints: [{
                    "max": 600,
                    "min": 100
                }]
            },
            {
                name: "Fasting Blood Sugar",
                fieldName: "fbs",
                dataType: "number",
                description: "Fasting Blood Sugar. " +
                    "1: Fasting blood sugar > 120 mg/dl." +
                    "0: Fasting blood sugar <= 120 mg/dl.",
                constraints: [{
                    "max": 1,
                    "min": 0
                }],
            },
            {
                name: "Resting Electrocardiographic results",
                fieldName: "restecg",
                dataType: "number",
                description: "Resting Electrocardiographic results. " +
                    "0: Normal." +
                    "1: Having ST-T wave abnormality (T wave inversions and/or ST elevation or depression of > 0.05 mV)." +
                    "2: Showing probable or definite left ventricular hypertrophy by Estes' criteria",
                constraints: [{
                    "max": 3,
                    "min": 0
                }],
            },
            {
                name: "Maximum Heart Rate achieved",
                fieldName: "thalach",
                dataType: "number",
                description: "The maximum heart rate achieved during exercise",
                constraints: [{
                    "max": 250,
                    "min": 60
                }],
            },
            {
                name: "ST Depression induced by exercise",
                fieldName: "oldpeak",
                dataType: "number",
                description: "ST depression induced by exercise relative to rest",
                constraints: [{
                    "max": 8,
                    "min": 0
                }],
            },
            {
                name: "Slope of the peak exercise ST segment",
                fieldName: "slope",
                dataType: "number",
                description: "Fasting Blood Sugar. " +
                    "0: Upsloping." +
                    "1: Flat." +
                    "2: Downsloping.",
                constraints: [{
                    "max": 2,
                    "min": 0
                }],
            },
            {
                name: "Major vessels colored by fluoroscopy",
                fieldName: "ca",
                dataType: "number",
                description: "Number of major vessels (0-4) colored by fluoroscopy.",
                constraints: [{
                    "max": 4,
                    "min": 0
                }],
            },
            {
                name: "Thalassemia",
                fieldName: "thal",
                dataType: "number",
                description: "Thalassemia. " +
                    "0: Normal." +
                    "1: Fixed defect (no blood flow in some part of the heart)." +
                    "2: Reversible defect (partial blood flow).",
                constraints: [{
                    "max": 2,
                    "min": 0
                }],
            },
        ]
    },
    {
        name: "parkinson",
        type: 'TEXT',
        photo: "https://assets-global.website-files.com/632b83c53f474e747bf2cdd0/63867a253eebc317a6b486f3_What%20is%20Parkinson_s%201.jpg",
        apiPath: `${constants.FASTAPI_CONNECTION_URL}/parkinson/predict`,
        description: "Parkinson's disease is a progressive neurological disorder that primarily affects movement. It occurs when there is a loss of dopamine-producing nerve cells in the brain. Dopamine is a neurotransmitter responsible for transmitting signals that control movement and coordination.",
        partsOfTheBody: ["head"],
        fields: [
            {
                name: "MDVP:Fo(Hz)",
                fieldName: "fo",
                dataType: "number",
                description: "MDVP:Fo(Hz): Average vocal fundamental frequency",
                constraints: [{
                    "max": 270,
                    "min": 80
                }]
            },
            {
                name: "MDVP:Fhi(Hz)",
                fieldName: "fhi",
                dataType: "number",
                description: "MDVP:Fhi(Hz): Highest vocal fundamental frequency",
                constraints: [{
                    "max": 600,
                    "min": 100
                }]
            },
            {
                name: "MDVP:Flo(Hz)",
                fieldName: "flo",
                dataType: "number",
                description: "MDVP:Flo(Hz): Lowest vocal fundamental frequency",
                constraints: [{
                    "max": 240,
                    "min": 60
                }]
            },
            {
                name: "MDVP:Jitter(%)",
                fieldName: "jitter_percent",
                dataType: "number",
                description: "MDVP:Jitter(%): Percentage of jitter in the voice signal",
                constraints: [{
                    "max": 0.5,
                    "min": 0
                }]
            },
            {
                name: "MDVP:Jitter(Abs)",
                fieldName: "jitter_abs",
                dataType: "number",
                description: "MDVP:Jitter(Abs): Absolute jitter, the absolute difference of consecutive periods between pulses in the voice signal",
                constraints: [{
                    "max": 0.1,
                    "min": 0
                }],
            },
            {
                name: "MDVP:RAP",
                fieldName: "rap",
                dataType: "number",
                description: "MDVP:RAP: Relative amplitude perturbation, a measure of variation in pitch periods in the voice signal",
                constraints: [{
                    "max": 0.03,
                    "min": 0
                }],
            },
            {
                name: "MDVP:PPQ",
                fieldName: "ppq",
                dataType: "number",
                description: "MDVP:PPQ: Five-point period perturbation quotient, a measure of jitter in the voice signal ",
                constraints: [{
                    "max": 0.03,
                    "min": 0
                }],
            },
            {
                name: "Jitter:DDP",
                fieldName: "ddp",
                dataType: "number",
                description: "Jitter:DDP: Jitter DDP (Jitter: Direct Distance between Peaks), a measure of variation in pitch periods in the voice signal",
                constraints: [{
                    "max": 0.07,
                    "min": 0
                }],
            },
            {
                name: "MDVP:Shimmer",
                fieldName: "shimmer",
                dataType: "number",
                description: "MDVP:Shimmer: Amplitude variation in the voice signal",
                constraints: [{
                    "max": 0.13,
                    "min": 0
                }],
            },
            {
                name: "MDVP:Shimmer(dB)",
                fieldName: "shimmer_dB",
                dataType: "number",
                description: "MDVP:Shimmer(dB): Amplitude variation in decibels in the voice signal",
                constraints: [{
                    "max": 1.5,
                    "min": 0
                }],
            },
            {
                name: "Shimmer:APQ3",
                fieldName: "apq3",
                dataType: "number",
                description: "Shimmer:APQ3: Three-point amplitude perturbation quotient, a measure of amplitude variation in the voice signal",
                constraints: [{
                    "max": 0.07,
                    "min": 0
                }],
            },
            {
                name: "Shimmer:APQ5",
                fieldName: "apq5",
                dataType: "number",
                description: "Shimmer:APQ5: Five-point amplitude perturbation quotient, a measure of amplitude variation in the voice signal",
                constraints: [{
                    "max": 0.09,
                    "min": 0
                }],
            },
            {
                name: "MDVP:APQ",
                fieldName: "apq",
                dataType: "number",
                description: "MDVP:APQ: Mean amplitude perturbation quotient, a measure of amplitude variation in the voice signal",
                constraints: [{
                    "max": 0.15,
                    "min": 0
                }],
            },
            {
                name: "Shimmer:DDA",
                fieldName: "dda",
                dataType: "number",
                description: "Shimmer:DDA: Amplitude variation DDA (Shimmer: Direct Distance between Peaks), a measure of amplitude variation in the voice signal",
                constraints: [{
                    "max": 0.18,
                    "min": 0
                }],
            },
            {
                name: "Noise-to-Harmonics Ratio",
                fieldName: "nhr",
                dataType: "number",
                description: "Noise-to-Harmonics Ratio, a measure of the ratio of noise to harmonics in the voice signal",
                constraints: [{
                    "max": 0.32,
                    "min": 0
                }],
            },
            {
                name: "Harmonics-to-Noise Ratio",
                fieldName: "hnr",
                dataType: "number",
                description: "Harmonics-to-Noise Ratio, a measure of the ratio of harmonics to noise in the voice signal",
                constraints: [{
                    "max": 34,
                    "min": 7
                }],
            },
            {
                name: "Detrended Fluctuation Analysis",
                fieldName: "dfa",
                dataType: "number",
                description: "Detrended Fluctuation Analysis, a measure of self-affinity or long-range dependence in the voice signal",
                constraints: [{
                    "max": 0.9,
                    "min": 0.4
                }],
            },
            {
                name: "Nonlinear measure derived",
                fieldName: "spread1",
                dataType: "number",
                description: "Nonlinear measure derived from fundamental frequency variation, a feature in the voice signal",
                constraints: [{
                    "max": -3,
                    "min": -8
                }],
            },
            {
                name: "Nonlinear measure derived",
                fieldName: "spread2",
                dataType: "number",
                description: "Nonlinear measure derived from fundamental frequency variation, another feature in the voice signal",
                constraints: [{
                    "max": 0.5,
                    "min": 0
                }],
            },
            {
                name: "Nonlinear measure derived",
                fieldName: "d2",
                dataType: "number",
                description: "Nonlinear measure derived from correlation dimension, a feature in the voice signal",
                constraints: [{
                    "max": 4,
                    "min": 1
                }],
            },
            {
                name: "Pitch Period Entropy",
                fieldName: "ppe",
                dataType: "number",
                description: "Pitch Period Entropy, a measure of irregularity in the pitch period of the voice signal",
                constraints: [{
                    "max": 0.6,
                    "min": 0
                }],
            },
        ]
    },
    {
        name: "diabetes",
        type: 'TEXT',
        photo: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/diabetes-overview-1579871892.jpg",
        apiPath: `${constants.FASTAPI_CONNECTION_URL}/diabetes/predict`,
        description: "Diabetes mellitus, commonly referred to as diabetes, is a chronic metabolic disorder characterized by elevated blood glucose levels. This condition arises either due to insufficient insulin production by the pancreas or the body's inability to effectively use the insulin produced.",
        partsOfTheBody: ["chest", "head", "leftArm", "leftFoot", "leftHand", "leftHand", "leftLeg", "leftShoulder",
        "rightArm", "rightFoot", "rightHand", "rightLeg", "rightShoulder", "stomach"],
        fields: [
            {
                name: "Pregnancies",
                fieldName: "pregnancies",
                dataType: "number",
                description: "Number of times pregnant",
                constraints: [{
                    "max": 17,
                    "min": 0
                }]
            },
            {
                name: "Glucose",
                fieldName: "glucose",
                dataType: "number",
                description: "Plasma glucose concentration after 2 hours in an oral glucose tolerance test.",
                constraints: [{
                    "max": 200,
                    "min": 0
                }]
            },
            {
                name: "BloodPressure",
                fieldName: "bloodPressure",
                dataType: "number",
                description: "Diastolic blood pressure",
                constraints: [{
                    "max": 130,
                    "min": 0
                }]
            },
            {
                name: "SkinThickness",
                fieldName: "skinThickness",
                dataType: "number",
                description: "Triceps skinfold thickness",
                constraints: [{
                    "max": 100,
                    "min": 0
                }]
            },
            {
                name: "Insulin",
                fieldName: "insulin",
                dataType: "number",
                description: "2-Hour serum insulin",
                constraints: [{
                    "max": 900,
                    "min": 0
                }],
            },
            {
                name: "Body Mass Index",
                fieldName: "bmi",
                dataType: "number",
                description: "Body Mass Index: Weight in kilograms divided by the square of height in meters.",
                constraints: [{
                    "max": 70,
                    "min": 0
                }],
            },
            {
                name: "Diabetes Pedigree Function",
                fieldName: "diabetesPedigreeFunction",
                dataType: "number",
                description: "Diabetes pedigree function, which provides information about the diabetes mellitus history in relatives and the genetic relationship of those relatives to the individual.",
                constraints: [{
                    "max": 3,
                    "min": 0
                }],
            },
            {
                name: "Age",
                fieldName: "age",
                dataType: "number",
                description: "The age of the individual",
                constraints: [{
                    "max": 150,
                    "min": 5
                }],
            },
        ]
    },
    {
        name: "cirrhosis",
        type: 'TEXT',
        photo: "https://domf5oio6qrcr.cloudfront.net/medialibrary/10869/edc0bfc4-1602-4f6c-a07c-299a66874435.jpg",
        apiPath: `${constants.FASTAPI_CONNECTION_URL}/cirrhosis/predict`,
        description: "Cirrhosis is a late stage of scarring (fibrosis) of the liver caused by many forms of liver diseases and conditions, such as hepatitis and chronic alcoholism. Each time your liver is injured, it tries to repair itself. In the process, scar tissue forms. As the cirrhosis progresses, more and more scar tissue forms, making it difficult for the liver to function.",
        partsOfTheBody: ["stomach"],
        fields: [
            {
                name: "Stage",
                fieldName: "stage",
                dataType: "number",
                description: "The stage of the individual (1 = has, 0 = hasn't)",
                constraints: [{
                    "max": 1,
                    "min": 0
                }]
            },
            {
                name: "Age Elderly",
                fieldName: "age_elderly",
                dataType: "number",
                description: "The age of the individual (1 = elderly, 0 = no elderly)",
                constraints: [{
                    "max": 1,
                    "min": 0
                }]
            },
            {
                name: "Ascites",
                fieldName: "ascites",
                dataType: "number",
                description: "The ascites of the individual (1 = yes, 0 = no)",
                constraints: [{
                    "max": 1,
                    "min": 0
                }]
            },
            {
                name: "Hepatomegaly",
                fieldName: "hepatomegaly",
                dataType: "number",
                description: "The hepatomegaly of the individual (1 = yes, 0 = no)",
                constraints: [{
                    "max": 1,
                    "min": 0
                }]
            },
            {
                name: "Spiders",
                fieldName: "spiders",
                dataType: "number",
                description: "The spiders of the individual (1 = yes, 0 = no)",
                constraints: [{
                    "max": 1,
                    "min": 0
                }],
            },
            {
                name: "Edema",
                fieldName: "edema",
                dataType: "number",
                description: "The edema of the individual (1 = yes, 0 = no)",
                constraints: [{
                    "max": 1,
                    "min": 0
                }],
            },
            {
                name: "Bilirubin high",
                fieldName: "bilirubin_high",
                dataType: "number",
                description: "The bilirubin high of the individual (1 = yes, 0 = no)",
                constraints: [{
                    "max": 1,
                    "min": 0
                }],
            },
            {
                name: "Copper high",
                fieldName: "copper_high",
                dataType: "number",
                description: "The copper high high of the individual (1 = yes, 0 = no)",
                constraints: [{
                    "max": 1,
                    "min": 0
                }],
            },
            {
                name: "Prothrombin normal",
                fieldName: "prothrombin_normal",
                dataType: "number",
                description: "The prothrombin normal of the individual (1 = yes, 0 = no)",
                constraints: [{
                    "max": 1,
                    "min": 0
                }],
            },
        ]
    },
    {
        name: "brain_stroke",
        type: 'TEXT',
        photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQG3cEeMOeezVWuoIMKzCCN7GC9o2xegxLSYLvDLRzZ1Loo06IKi8Nnm-T-VfrIBGlqBY&usqp=CAU",
        apiPath: `${constants.FASTAPI_CONNECTION_URL}/brain_stroke/predict`,
        description: "A brain stroke, also known as a cerebrovascular accident (CVA) or brain attack, occurs when there is a sudden disruption of blood flow to the brain. This interruption in blood supply can result in damage to brain cells, leading to various neurological impairments. Strokes can be ischemic (caused by a blockage) or hemorrhagic (caused by bleeding).",
        partsOfTheBody: ["head"],
        fields: [
            {
                name: "Gender",
                fieldName: "gender",
                dataType: "number",
                description: "The gender of the individual (1 = male, 0 = female)",
                constraints: [{
                    "max": 1,
                    "min": 0
                }]
            },
            {
                name: "Age",
                fieldName: "age",
                dataType: "number",
                description: "The age of the individual",
                constraints: [{
                    "max": 150,
                    "min": 5
                }]
            },
            {
                name: "Hypertension",
                fieldName: "hypertension",
                dataType: "number",
                description: "The hypertension of the individual (1 = has, 0 = hasn't)",
                constraints: [{
                    "max": 1,
                    "min": 0
                }]
            },
            {
                name: "Heart disease",
                fieldName: "heart_disease",
                dataType: "number",
                description: "The any heart diseases of the individual (1 = has, 0 = hasn't)",
                constraints: [{
                    "max": 1,
                    "min": 0
                }]
            },
            {
                name: "Work type",
                fieldName: "work_type",
                dataType: "number",
                description: "The work type of the individual (0 = private, 1 = self employed, 2=children, 3=government job)",
                constraints: [{
                    "max": 3,
                    "min": 0
                }],
            },
            {
                name: "Residence type",
                fieldName: "residence_type",
                dataType: "number",
                description: "The residence type of the individual (0 = urban, 1 = rural)",
                constraints: [{
                    "max": 1,
                    "min": 0
                }],
            },
            {
                name: "Average glucose level",
                fieldName: "avg_glucose_level",
                dataType: "number",
                description: "The average glucose level represents the mean concentration of glucose in the blood over a specific period",
                constraints: [{
                    "max": 280,
                    "min": 50
                }],
            },
            {
                name: "Body Mass Index",
                fieldName: "bmi",
                dataType: "number",
                description: "Body Mass Index: Weight in kilograms divided by the square of height in meters.",
                constraints: [{
                    "max": 70,
                    "min": 0
                }],
            },
            {
                name: "Smoking status",
                fieldName: "smoking_status",
                dataType: "number",
                description: "Bhe Smoking status type of the individual (0 = never smoked, 1 = formerly smoked, 2= smokes)",
                constraints: [{
                    "max": 2,
                    "min": 0
                }],
            },
        ],
    },
    {
        name: "alzheimer",
        type: 'TEXT',
        photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwg7PIwdOPwR0JGkNrW_lYLta4EwQxcLTGxw&usqp=CAU",
        apiPath: `${constants.FASTAPI_CONNECTION_URL}/alzheimer/predict`,
        description: "Alzheimer's disease is a progressive neurodegenerative disorder characterized by a decline in cognitive function, memory loss, and changes in behavior. It is the most common cause of dementia, a syndrome affecting memory, thinking, and social abilities severely enough to interfere with daily life.",
        partsOfTheBody: ["head"],
        fields: [
            {
                name: "Gender",
                fieldName: "gender",
                dataType: "number",
                description: "The gender of the individual (1 = male, 0 = female)",
                constraints: [{
                    "max": 1,
                    "min": 0
                }]
            },
            {
                name: "Age",
                fieldName: "age",
                dataType: "number",
                description: "The age of the individual",
                constraints: [{
                    "max": 150,
                    "min": 5
                }]
            },
            {
                name: "Years of education",
                fieldName: "educ",
                dataType: "number",
                description: "The years of education of the individual",
                constraints: [{
                    "max": 30,
                    "min": 0
                }]
            },
            {
                name: "Socioeconomic Status",
                fieldName: "ses",
                dataType: "number",
                description: "The Socioeconomic Status of the individual (5 = the higher, 0 = the lowest)",
                constraints: [{
                    "max": 5,
                    "min": 0
                }]
            },
            {
                name: "Mini Mental State Examination",
                fieldName: "mmse",
                dataType: "number",
                description: "Mini Mental State Examination: http://www.dementiatoday.com/wp-content/uploads/2012/06/MiniMentalStateExamination.pdf",
                constraints: [{
                    "max": 30,
                    "min": 16
                }],
            },
            {
                name: "Estimated Total Intracranial Volume",
                fieldName: "etiv",
                dataType: "number",
                description: "Estimated Total Intracranial Volume: https://link.springer.com/article/10.1007/s12021-015-9266-5",
                constraints: [{
                    "max": 2000,
                    "min": 1100
                }],
            },
            {
                name: "Normalize Whole Brain Volume",
                fieldName: "nwbv",
                dataType: "number",
                description: "Normalize Whole Brain Volume: https://www.ncbi.nlm.nih.gov/pubmed/11547042",
                constraints: [{
                    "max": 0.9,
                    "min": 0.6
                }],
            },
            {
                name: "Atlas Scaling Factor",
                fieldName: "asf",
                dataType: "number",
                description: "Atlas Scaling Factor: http://www.sciencedirect.com/science/article/pii/S1053811904003271",
                constraints: [{
                    "max": 1.6,
                    "min": 0.8
                }],
            },
        ],

    },

    {
        name: "lung",
        type: 'TEXT',
        photo: "https://cdn.mos.cms.futurecdn.net/i5Nn5wDrpntkLMxQb4EA85-1200-80.jpg",
        apiPath: `${constants.FASTAPI_CONNECTION_URL}/lung/predict`,
        description: "Lung diseases encompass a diverse group of conditions affecting the respiratory system, including the lungs and airways. These diseases can range from acute infections to chronic conditions, impacting the ability to breathe and exchange oxygen. Common lung diseases involve various causes, symptoms, and treatments.",
        partsOfTheBody: ["chest", "stomach"],
        fields: [
            {
                name: "Age",
                fieldName: "age",
                dataType: "number",
                description: "The age of the individual",
                constraints: [{
                    "max": 150,
                    "min": 5
                }]
            },
            {
                name: "Smoke",
                fieldName: "smokes",
                dataType: "number",
                description: "How many years have you been smoking?",
                constraints: [{
                    "max": 70,
                    "min": 0
                }]
            },
            {
                name: "AreaQ",
                fieldName: "areaQ",
                dataType: "number",
                description: "Categorical or ordinal variable representing the environmental factor, ranging from 1 to 10",
                constraints: [{
                    "max": 10,
                    "min": 1
                }]
            },
            {
                name: "Alkohol",
                fieldName: "alkohol",
                dataType: "number",
                description: "How many years have you been drinking alcohol?",
                constraints: [{
                    "max": 70,
                    "min": 0
                }],
            },
        ],

    },

    {
        name: "kidney",
        type: 'TEXT',
        photo: "https://cdn.aarp.net/content/dam/aarp/health/conditions_treatments/2021/10/1140-kidney-disease.jpg",
        apiPath: `${constants.FASTAPI_CONNECTION_URL}/kidney/predict`,
        description: "Kidney diseases encompass a range of conditions that affect the kidneys, vital organs responsible for filtering waste and excess fluids from the blood. Chronic kidney disease (CKD) is a common category, but various other conditions can impact kidney function.",
        partsOfTheBody: ["stomach"],
        fields: [
            {
                name: "Age",
                fieldName: "age",
                dataType: "number",
                description: "The age of the individual",
                constraints: [{
                    "max": 150,
                    "min": 5
                }]
            },
            {
                name: "blood pressure",
                fieldName: "bp",
                dataType: "number",
                description: "Diastolic blood pressure",
                constraints: [{
                    "max": 200,
                    "min": 40
                }]
            },
            {
                name: "Specific Gravity",
                fieldName: "sg",
                dataType: "number",
                description: "It is a measure of the kidney's ability to concentrate and dilute urine",
                constraints: [{
                    "max": 1.03,
                    "min": 1
                }]
            },
            {
                name: "Albumin",
                fieldName: "al",
                dataType: "number",
                description: "Albumin is a protein normally present in the blood, and it plays a crucial role in maintaining the oncotic pressure of blood",
                constraints: [{
                    "max": 6,
                    "min": 0
                }],
            },
            {
                name: "Sugar",
                fieldName: "su",
                dataType: "number",
                description: "Sugar in the blood",
                constraints: [{
                    "max": 10,
                    "min": 0
                }],
            },
            {
                name: "Pus cell clumps",
                fieldName: "pcc",
                dataType: "number",
                description: "pus cell clumps (0 - not present, 1 - present)",
                constraints: [{
                    "max": 1,
                    "min": 0
                }],
            },
            {
                name: "Bacteria",
                fieldName: "ba",
                dataType: "number",
                description: "Bacteria (0 - not present, 1 - present)",
                constraints: [{
                    "max": 1,
                    "min": 0
                }],
            },
            {
                name: "Blood glucose",
                fieldName: "bgr",
                dataType: "number",
                description: "Plasma glucose concentration after 2 hours in an oral glucose tolerance test",
                constraints: [{
                    "max": 500,
                    "min": 20
                }],
            },
            {
                name: "Blood urea",
                fieldName: "bu",
                dataType: "number",
                description: "Blood urea, specifically Blood Urea Nitrogen (BUN), is a blood test that measures the amount of nitrogen in your blood that comes from urea.",
                constraints: [{
                    "max": 400,
                    "min": 1
                }],
            },
            {
                name: "Serum creatinine",
                fieldName: "sc",
                dataType: "number",
                description: "Serum creatinine is a blood test that measures the level of creatinine in your blood.",
                constraints: [{
                    "max": 80,
                    "min": 0
                }],
            },
            {
                name: "Hemoglobin",
                fieldName: "hemo",
                dataType: "number",
                description: "Hemoglobin is a protein in red blood cells that carries oxygen from the lungs to the rest of the body and returns carbon dioxide from the body to the lungs for exhalation. ",
                constraints: [{
                    "max": 20,
                    "min": 3
                }],
            },
            {
                name: "Hypertension",
                fieldName: "htn",
                dataType: "number",
                description: "Hypertension (1 - yes, 0 - no)",
                constraints: [{
                    "max": 1,
                    "min": 0
                }],
            },
            {
                name: "Diabetes mellitus",
                fieldName: "dm",
                dataType: "number",
                description: "Diabetes mellitus(1 - yes, 0 - no)",
                constraints: [{
                    "max": 1,
                    "min": 0
                }],
            },
            {
                name: "Coronary artery disease",
                fieldName: "cad",
                dataType: "number",
                description: "Coronary artery disease (1 - yes, 0 - no)",
                constraints: [{
                    "max": 1,
                    "min": 0
                }],
            },
            {
                name: "Appetite",
                fieldName: "appet",
                dataType: "number",
                description: "Appetite (1 - good, 0 - poor)",
                constraints: [{
                    "max": 1,
                    "min": 0
                }],
            },
            {
                name: "Pedal edema",
                fieldName: "pe",
                dataType: "number",
                description: "Pedal edema (1 - yes, 0 - no)",
                constraints: [{
                    "max": 1,
                    "min": 0
                }],
            },
            {
                name: "Anemia",
                fieldName: "ane",
                dataType: "number",
                description: "Anemia (1 - yes, 0 - no)",
                constraints: [{
                    "max": 1,
                    "min": 0
                }],
            },
        ],

    },

    {
        name: "asthma",
        type: 'TEXT',
        photo: "https://d2jx2rerrg6sh3.cloudfront.net/image-handler/picture/2018/5/shutterstockBy_u3d.jpg",
        apiPath: `${constants.FASTAPI_CONNECTION_URL}/asthma/predict`,
        description: "Asthma is a chronic respiratory condition characterized by inflammation and narrowing of the airways, leading to recurring episodes of wheezing, shortness of breath, chest tightness, and coughing. It is a common condition that can vary in severity, and while there is no cure, effective management allows individuals to lead active lives.",
        partsOfTheBody: ["chest", "stomach"],
        fields: [
            {
                name: "Tiredness",
                fieldName: "tiredness",
                dataType: "number",
                description: "Tiredness (1 - yes, 0 - no)",
                constraints: [{
                    "max": 1,
                    "min": 0
                }]
            },
            {
                name: "Dry Cough",
                fieldName: "dry_cough",
                dataType: "number",
                description: "Dry Cough (1 - yes, 0 - no)",
                constraints: [{
                    "max": 1,
                    "min": 0
                }]
            },
            {
                name: "None Symptom",
                fieldName: "none_symptom",
                dataType: "number",
                description: "None Symptom (1 - yes, 0 - no)",
                constraints: [{
                    "max": 1,
                    "min": 0
                }]
            },
            {
                name: "Pains",
                fieldName: "pains",
                dataType: "number",
                description: "Pains (1 - yes, 0 - no)",
                constraints: [{
                    "max": 1,
                    "min": 0
                }],
            },
            {
                name: "Nasal congestion",
                fieldName: "nasal_congestion",
                dataType: "number",
                description: "Nasal congestion (1 - yes, 0 - no)",
                constraints: [{
                    "max": 1,
                    "min": 0
                }],
            },
            {
                name: "None experiening",
                fieldName: "none_experiening",
                dataType: "number",
                description: "None experiening (1 - yes, 0 - no)",
                constraints: [{
                    "max": 1,
                    "min": 0
                }],
            },
            {
                name: "Age 0-9",
                fieldName: "age_0_9",
                dataType: "number",
                description: "Age 0-9 (1 - yes, 0 - no)",
                constraints: [{
                    "max": 1,
                    "min": 0
                }],
            },
            {
                name: "Age 10-19",
                fieldName: "age_10_19",
                dataType: "number",
                description: "Age 10-19 (1 - yes, 0 - no)",
                constraints: [{
                    "max": 1,
                    "min": 0
                }],
            },
            {
                name: "Age 20-24",
                fieldName: "age_20_24",
                dataType: "number",
                description: "Age 120-24 (1 - yes, 0 - no)",
                constraints: [{
                    "max": 1,
                    "min": 0
                }],
            },
            {
                name: "Age 25-59",
                fieldName: "age_25_59",
                dataType: "number",
                description: "Age 25-59 (1 - yes, 0 - no)",
                constraints: [{
                    "max": 1,
                    "min": 0
                }],
            },
            {
                name: "Age 60+",
                fieldName: "age_60_more",
                dataType: "number",
                description: "Age 60+ (1 - yes, 0 - no)",
                constraints: [{
                    "max": 1,
                    "min": 0
                }],
            },
            {
                name: "Gender female",
                fieldName: "gender_female",
                dataType: "number",
                description: "Gender female (1 - yes, 0 - no)",
                constraints: [{
                    "max": 1,
                    "min": 0
                }],
            },
            {
                name: "Gender male",
                fieldName: "gender_male",
                dataType: "number",
                description: "Gender male (1 - yes, 0 - no)",
                constraints: [{
                    "max": 1,
                    "min": 0
                }],
            },
            {
                name: "Severity mild",
                fieldName: "severity_mild",
                dataType: "number",
                description: "Severity mild (1 - yes, 0 - no)",
                constraints: [{
                    "max": 1,
                    "min": 0
                }],
            },
            {
                name: "Severity moderate",
                fieldName: "severity_moderate",
                dataType: "number",
                description: "Severity moderate (1 - yes, 0 - no)",
                constraints: [{
                    "max": 1,
                    "min": 0
                }],
            },
            {
                name: "Severity none",
                fieldName: "severity_none",
                dataType: "number",
                description: "Severity none (1 - yes, 0 - no)",
                constraints: [{
                    "max": 1,
                    "min": 0
                }],
            }
        ],

    },

];