"use client";

import { useState } from 'react';
import Form from './_components/Form';
import RequestForm from './_components/RequestForm';
import Reset from './_components/Reset';

export default function LoginPage() {
    const [step, setStep] = useState<'login' | 'request' | 'reset'>('login');


    // Экран входа
    if (step === 'login') {
        return <Form setStep={setStep}/>
    }

    // Экран запроса кода
    if (step === 'request') {
        return <RequestForm setStep={setStep}/>
    }

    // Экран ввода нового пароля
    return <Reset setStep={setStep}/>
}