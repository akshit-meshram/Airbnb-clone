'use client'

import axios from 'axios'
import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { useCallback,useState } from 'react'
import{
    FieldValues,
    SubmitHandler,
    useForm
} from 'react-hook-form'

import useRegisterModal from '@/app/hooks/useRegisterModal'

import React from 'react'
import Modal from './Modal'
import Heading from '../Heading'
import Input from '../inputs/input'
import toast from 'react-hot-toast'
import Button from '../Button'

const RegisterModal = () => {

    const registerModal = useRegisterModal()
    const [isLoading, setIsLoading] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)

        axios.post('/api/register', data)
            .then(() => {
                registerModal.onClose()
            })
            .catch((error) => {
                toast.error('Something went wrong!')
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading 
            title="Welcome to Airbnb"
            subtitle="Create an account"
            />
            <Input 
                id="email"
                label="Email"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input 
                id="name"
                label="name"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input 
                type="password"
                id="password"
                label="P assword"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            
        </div>
    )

    const footerContent = (
        <div className='flex flex-col gap-4 mt-3'>
            <hr />
            <Button
            outline
            label='Continue with Google'
            icon={FcGoogle}
            onClick={() => {}}
            />
            <Button
            outline
            label='Continue with Github'
            icon={AiFillGithub}
            onClick={() => {}}
            />
            <div className='
            text-neutral-500
            text-center
            font-light
            mt-4
            '>
                <div className='flex flex-row items-center gap-2 justify-center'>
                    <div>
                        Already have an account?
                    </div>
                    <div
                    onClick={registerModal.onClose}
                    className='
                    text-neutral-800
                    cursor-pointer
                    hover:underline
                    '

                    >
                        Log-in
                    </div>
                </div>

            </div>
        </div>
    )

  return (
    <Modal 
    disabled={isLoading}
    isOpen={registerModal.isOpen}
    title="Login"
    actionLabel="Continue"
    onClose={registerModal.onClose}
    onSubmit={handleSubmit(onSubmit)}
    body={bodyContent}
    footer={footerContent}
    />
  )
}

export default RegisterModal
