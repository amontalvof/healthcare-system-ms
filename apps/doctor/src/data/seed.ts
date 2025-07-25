export const insurances = [
    { name: 'Aetna' },
    { name: 'Blue Cross Blue Shield' },
    { name: 'Cigna' },
    { name: 'United Healthcare' },
    { name: 'Humana' },
    { name: 'Molina Healthcare' },
    { name: 'Kaiser' },
    { name: 'Anthem' },
    { name: 'WellCare' },
    { name: 'Centene' },
];

export const specialties = [
    {
        name: 'General physician',
        route: 'general-physician',
        image: 'https://res.cloudinary.com/a03m02f92/image/upload/v1750037892/healthcare/specialties/General_physician_esyxv9.svg',
    },
    {
        name: 'Gynecologist',
        route: 'gynecologist',
        image: 'https://res.cloudinary.com/a03m02f92/image/upload/v1750037892/healthcare/specialties/Gynecologist_kwonoz.svg',
    },
    {
        name: 'Dermatologist',
        route: 'dermatologist',
        image: 'https://res.cloudinary.com/a03m02f92/image/upload/v1750037892/healthcare/specialties/Dermatologist_yqka0z.svg',
    },
    {
        name: 'Pediatricians',
        route: 'pediatricians',
        image: 'https://res.cloudinary.com/a03m02f92/image/upload/v1750037893/healthcare/specialties/Pediatricians_fuscof.svg',
    },
    {
        name: 'Neurologist',
        route: 'neurologist',
        image: 'https://res.cloudinary.com/a03m02f92/image/upload/v1750037892/healthcare/specialties/Neurologist_ralf6m.svg',
    },
    {
        name: 'Gastroenterologist',
        route: 'gastroenterologist',
        image: 'https://res.cloudinary.com/a03m02f92/image/upload/v1750037893/healthcare/specialties/Gastroenterologist_jkbvkq.svg',
    },
];

export const doctors = [
    {
        fullName: 'Donald Smith',
        email: 'donald.smith@mail.com',
        userId: '1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d',
        degree: 'MD',
        experience: '10 years',
        fees: 200,
        hospital: 'Jackson Memorial Hospital',
        address: {
            country: 'United States of America',
            street: '1611 NW 12th Ave',
            city: 'Miami',
            state: 'FL',
            postalCode: '33136',
        },
        countryCode: '+1',
        about: 'Dr. Smith is dedicated to providing compassionate, patient-centered care and has a special interest in preventive medicine and chronic disease management.',
        imageUrl:
            'https://res.cloudinary.com/a03m02f92/image/upload/v1750127675/healthcare/doctors/doc14_baazif.png',
        phone: '3055550101',
        workStart: '09:00',
        workEnd: '17:00',
        specialtyId: 1,
        insuranceIds: [1, 3, 5],
    },
    {
        fullName: 'Emily Davis',
        email: 'emily.davis@mail.com',
        userId: '2b3c4d5e-6f7a-8b9c-0d1e-2f3a4b5c6d7e',
        degree: 'DO',
        experience: '8 years',
        fees: 180,
        hospital: 'Tampa General Hospital',
        address: {
            country: 'United States of America',
            street: '1 Tampa General Circle',
            city: 'Tampa',
            state: 'FL',
            postalCode: '33606',
        },
        countryCode: '+1',
        about: 'With over a decade of experience, Dr. Davis is known for her thorough approach and commitment to staying current with the latest advancements in her field.',
        imageUrl:
            'https://res.cloudinary.com/a03m02f92/image/upload/v1750127676/healthcare/doctors/doc15_khs1kf.png',
        phone: '8135550102',
        workStart: '09:00',
        workEnd: '17:00',
        specialtyId: 2,
        insuranceIds: [2, 4],
    },
    {
        fullName: 'Michael Johnson',
        email: 'michael.johnson@mail.com',
        userId: '3c4d5e6f-7a8b-9c0d-1e2f-3a4b5c6d7e8f',
        degree: 'MBBS',
        experience: '15 years',
        fees: 250,
        hospital: 'UF Health Shands Hospital',
        address: {
            country: 'United States of America',
            street: '1329 SW 16th St',
            city: 'Gainesville',
            state: 'FL',
            postalCode: '32608',
        },
        countryCode: '+1',
        about: 'Dr. Johnson believes in building strong relationships with his patients and emphasizes open communication and shared decision-making.',
        imageUrl:
            'https://res.cloudinary.com/a03m02f92/image/upload/v1750127674/healthcare/doctors/doc12_czhhez.png',
        phone: '3525550103',
        workStart: '09:00',
        workEnd: '17:00',
        specialtyId: 3,
        insuranceIds: [1, 2, 6, 8],
    },
    {
        fullName: 'Sarah Williams',
        email: 'sarah.williams@mail.com',
        userId: '4d5e6f7a-8b9c-0d1e-2f3a-4b5c6d7e8f9a',
        degree: 'MD',
        experience: '5 years',
        fees: 150,
        hospital: 'Orlando Regional Medical Center',
        address: {
            country: 'United States of America',
            street: '52 W Underwood St',
            city: 'Orlando',
            state: 'FL',
            postalCode: '32806',
        },
        countryCode: '+1',
        about: 'Dr. Williams has a passion for pediatric care and strives to create a welcoming environment for children and their families.',
        imageUrl:
            'https://res.cloudinary.com/a03m02f92/image/upload/v1750127675/healthcare/doctors/doc13_sf1lvt.png',
        phone: '4075550104',
        workStart: '09:00',
        workEnd: '17:00',
        specialtyId: 4,
        insuranceIds: [3, 5, 7],
    },
    {
        fullName: 'David Brown',
        email: 'david.brown@mail.com',
        userId: '5e6f7a8b-9c0d-1e2f-3a4b-5c6d7e8f9a0b',
        degree: 'MD, PhD',
        experience: '20 years',
        fees: 300,
        hospital: 'Broward Health Medical Center',
        address: {
            country: 'United States of America',
            street: '1600 S Andrews Ave',
            city: 'Fort Lauderdale',
            state: 'FL',
            postalCode: '33316',
        },
        countryCode: '+1',
        about: 'Dr. Brown specializes in complex cases and is recognized for his diagnostic skills and attention to detail.',
        imageUrl:
            'https://res.cloudinary.com/a03m02f92/image/upload/v1750127673/healthcare/doctors/doc7_nzducq.png',
        phone: '9545550105',
        workStart: '09:00',
        workEnd: '17:00',
        specialtyId: 5,
        insuranceIds: [4, 6, 9],
    },
    {
        fullName: 'Lisa Jones',
        email: 'lisa.jones@mail.com',
        userId: '6f7a8b9c-0d1e-2f3a-4b5c-6d7e8f9a0b1c',
        degree: 'DO',
        experience: '7 years',
        fees: 175,
        hospital: 'Moffitt Cancer Center',
        address: {
            country: 'United States of America',
            street: '12902 Magnolia Dr',
            city: 'Tampa',
            state: 'FL',
            postalCode: '33612',
        },
        countryCode: '+1',
        about: 'Dr. Jones is committed to holistic healthcare, integrating lifestyle and wellness strategies into her practice.',
        imageUrl:
            'https://res.cloudinary.com/a03m02f92/image/upload/v1750127672/healthcare/doctors/doc2_jci6ba.png',
        phone: '8135550106',
        workStart: '09:00',
        workEnd: '17:00',
        specialtyId: 6,
        insuranceIds: [1, 10],
    },
    {
        fullName: 'William Miller',
        email: 'william.miller@mail.com',
        userId: '7a8b9c0d-1e2f-3a4b-5c6d-7e8f9a0b1c2d',
        degree: 'MD',
        experience: '12 years',
        fees: 220,
        hospital: 'AdventHealth Orlando',
        address: {
            country: 'United States of America',
            street: '601 E Rollins St',
            city: 'Orlando',
            state: 'FL',
            postalCode: '32803',
        },
        countryCode: '+1',
        about: 'Dr. Miller is an advocate for preventive screenings and patient education, ensuring his patients are empowered to make informed health choices.',
        imageUrl:
            'https://res.cloudinary.com/a03m02f92/image/upload/v1750127672/healthcare/doctors/doc6_hnwpac.png',
        phone: '4075550107',
        workStart: '09:00',
        workEnd: '17:00',
        specialtyId: 1,
        insuranceIds: [2, 3, 4],
    },
    {
        fullName: 'Olivia Wilson',
        email: 'olivia.wilson@mail.com',
        userId: '8b9c0d1e-2f3a-4b5c-6d7e-8f9a0b1c2d3e',
        degree: 'MBBS',
        experience: '6 years',
        fees: 160,
        hospital: "Johns Hopkins All Children's Hospital",
        address: {
            country: 'United States of America',
            street: '501 6th Ave S',
            city: 'St. Petersburg',
            state: 'FL',
            postalCode: '33701',
        },
        countryCode: '+1',
        about: 'Dr. Wilson has extensive experience in hospital settings and values teamwork and collaboration with other healthcare professionals.',
        imageUrl:
            'https://res.cloudinary.com/a03m02f92/image/upload/v1750127671/healthcare/doctors/doc9_sdwsce.png',
        phone: '7275550108',
        workStart: '09:00',
        workEnd: '17:00',
        specialtyId: 2,
        insuranceIds: [5, 6],
    },
    {
        fullName: 'Robert Moore',
        email: 'robert.moore@mail.com',
        userId: '9c0d1e2f-3a4b-5c6d-7e8f-9a0b1c2d3e4f',
        degree: 'MD',
        experience: '9 years',
        fees: 210,
        hospital: 'Cleveland Clinic Florida',
        address: {
            country: 'United States of America',
            street: '2950 Cleveland Clinic Blvd',
            city: 'Weston',
            state: 'FL',
            postalCode: '33331',
        },
        countryCode: '+1',
        about: 'Dr. Moore is dedicated to continuous learning and regularly participates in medical conferences and research initiatives.',
        imageUrl:
            'https://res.cloudinary.com/a03m02f92/image/upload/v1750127671/healthcare/doctors/doc10_xbm7px.png',
        phone: '9545550109',
        workStart: '09:00',
        workEnd: '17:00',
        specialtyId: 3,
        insuranceIds: [7, 8, 9],
    },
    {
        fullName: 'Emma Taylor',
        email: 'emma.taylor@mail.com',
        userId: '0d1e2f3a-4b5c-6d7e-8f9a-0b1c2d3e4f5a',
        degree: 'DO',
        experience: '4 years',
        fees: 190,
        hospital: 'Baptist Hospital of Miami',
        address: {
            country: 'United States of America',
            street: '8900 N Kendall Dr',
            city: 'Miami',
            state: 'FL',
            postalCode: '33176',
        },
        countryCode: '+1',
        about: 'Dr. Taylor is known for her empathetic bedside manner and her ability to explain complex medical concepts in an understandable way.',
        imageUrl:
            'https://res.cloudinary.com/a03m02f92/image/upload/v1750127670/healthcare/doctors/doc5_tm3jcw.png',
        phone: '3055550110',
        workStart: '09:00',
        workEnd: '17:00',
        specialtyId: 4,
        insuranceIds: [1, 4, 7, 10],
    },
    {
        fullName: 'James Anderson',
        email: 'james.anderson@mail.com',
        userId: '1e2f3a4b-5c6d-7e8f-9a0b-1c2d3e4f5a6b',
        degree: 'MD',
        experience: '11 years',
        fees: 230,
        hospital: "Nicklaus Children's Hospital",
        address: {
            country: 'United States of America',
            street: '3100 SW 62nd Ave',
            city: 'Miami',
            state: 'FL',
            postalCode: '33155',
        },
        countryCode: '+1',
        about: 'Dr. Anderson has a strong background in community health and volunteers regularly at local clinics.',
        imageUrl:
            'https://res.cloudinary.com/a03m02f92/image/upload/v1750127670/healthcare/doctors/doc8_nysh7k.png',
        phone: '3055550111',
        workStart: '09:00',
        workEnd: '17:00',
        specialtyId: 5,
        insuranceIds: [2, 5],
    },
    {
        fullName: 'Ava Thomas',
        email: 'ava.thomas@mail.com',
        userId: '2f3a4b5c-6d7e-8f9a-0b1c-2d3e4f5a6b7c',
        degree: 'MD',
        experience: '3 years',
        fees: 140,
        hospital: "Ascension St. Vincent's Medical Center",
        address: {
            country: 'United States of America',
            street: '4201 Latham St',
            city: 'Jacksonville',
            state: 'FL',
            postalCode: '32205',
        },
        countryCode: '+1',
        about: "Dr. Thomas is passionate about women's health and is actively involved in outreach programs to improve access to care.",
        imageUrl:
            'https://res.cloudinary.com/a03m02f92/image/upload/v1750127673/healthcare/doctors/doc11_ybicjk.png',
        phone: '9045550112',
        workStart: '09:00',
        workEnd: '17:00',
        specialtyId: 6,
        insuranceIds: [3, 6, 9],
    },
    {
        fullName: 'Charles Jackson',
        email: 'charles.jackson@mail.com',
        userId: '3a4b5c6d-7e8f-9a0b-1c2d-3e4f5a6b7c8d',
        degree: 'MBBS',
        experience: '14 years',
        fees: 195,
        hospital: 'UF Health Jacksonville',
        address: {
            country: 'United States of America',
            street: '655 West 8th Street',
            city: 'Jacksonville',
            state: 'FL',
            postalCode: '32209',
        },
        countryCode: '+1',
        about: 'Dr. Jackson is a leader in his specialty and has published several articles in peer-reviewed medical journals.',
        imageUrl:
            'https://res.cloudinary.com/a03m02f92/image/upload/v1750127669/healthcare/doctors/doc4_ruxfqi.png',
        phone: '9045550113',
        workStart: '09:00',
        workEnd: '17:00',
        specialtyId: 1,
        insuranceIds: [1, 8],
    },
    {
        fullName: 'Mark White',
        email: 'mark.white@mail.com',
        userId: '4b5c6d7e-8f9a-0b1c-2d3e-4f5a6b7c8d9e',
        degree: 'MD',
        experience: '13 years',
        fees: 205,
        hospital: 'Sarasota Memorial Hospital',
        address: {
            country: 'United States of America',
            street: '1700 S Tamiami Trail',
            city: 'Sarasota',
            state: 'FL',
            postalCode: '34239',
        },
        countryCode: '+1',
        about: 'Dr. White is focused on minimally invasive procedures and is always seeking innovative solutions for his patients.',
        imageUrl:
            'https://res.cloudinary.com/a03m02f92/image/upload/v1750127669/healthcare/doctors/doc1_spnb2l.png',
        phone: '9415550114',
        workStart: '09:00',
        workEnd: '17:00',
        specialtyId: 2,
        insuranceIds: [2, 7],
    },
    {
        fullName: 'Daniel Harris',
        email: 'daniel.harris@mail.com',
        userId: '5c6d7e8f-9a0b-1c2d-3e4f-5a6b7c8d9e0f',
        degree: 'DO',
        experience: '2 years',
        fees: 170,
        hospital: 'Lee Memorial Hospital',
        address: {
            country: 'United States of America',
            street: '2776 Cleveland Ave',
            city: 'Fort Myers',
            state: 'FL',
            postalCode: '33901',
        },
        countryCode: '+1',
        about: 'Dr. Harris values patient feedback and incorporates it into his practice to continually improve the quality of care.',
        imageUrl:
            'https://res.cloudinary.com/a03m02f92/image/upload/v1750127669/healthcare/doctors/doc3_hnnra9.png',
        phone: '2395550115',
        workStart: '09:00',
        workEnd: '17:00',
        specialtyId: 3,
        insuranceIds: [4, 5, 6],
    },
];
