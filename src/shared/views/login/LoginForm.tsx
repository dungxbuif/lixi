'use client';
import { Button } from '@/shared/components/atoms/Button';
import { Icons } from '@/shared/components/atoms/Icon';
import { Input } from '@/shared/components/atoms/Input';
import { PagePath } from '@/shared/constant';
import { useToast } from '@/shared/hooks/use-toast';
import { yupResolver } from '@hookform/resolvers/yup';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';


const schema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup
        .string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required')
});

export default function LoginForm() {
    const { data: session } = useSession();
    const router = useRouter();
    const { toast } = useToast();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm({
        resolver: yupResolver(schema)
    });

    useEffect(() => {
        console.log(session)
        if (session) {
            router.push(PagePath.MAIN);
        }
    }, [session, router]);

    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = async (data) => {
        const result = await signIn('credentials', {
            ...data,
            redirect: false
        });
        if (result.error === null) {
            toast({
                title: 'Success',
                description: 'Signed in successfully!',
                status: 'SUCCESS'
            });
        } else {
            toast({
                title: 'Error',
                description: result.error || 'An error occurred during sign in',
                status: 'ERROR'
            });
        }
    };

    const handleGoogleSignIn = async () => {
        signIn('google', {
            onError: (error) => {
                toast({
                    title: 'Error',
                    description: error || 'An error occurred during Google sign in',
                    status: 'ERROR'
                });
            },
            onSuccess: () => {
                toast({
                    title: 'Success',
                    description: 'Signed in with Google successfully!',
                    status: 'SUCCESS'
                });
            }
        });
    };

    return (
        <div className='flex flex-col'>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>
                <Input
                    type='email'
                    {...register('email')}
                    placeholder='Email'
                    className={`p-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded`}
                />
                {errors.email && <p className='text-red text-[13px] mt-2'>{errors.email.message}</p>}

                <div className='relative mt-4'>
                    <Input
                        type={showPassword ? 'text' : 'password'}
                        {...register('password')}
                        placeholder='Password'
                        className={`p-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded pr-10`}
                    />
                    <button
                        type='button'
                        className='absolute inset-y-0 right-3 flex items-center'
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? (
                            <Icons.eyeOff className='w-5 h-5 text-gray-500' />
                        ) : (
                            <Icons.eye className='w-5 h-5 text-gray-500' />
                        )}
                    </button>
                </div>
                {errors.password && <p className='text-red text-[13px] mt-2'>{errors.password.message}</p>}

                <Button type='submit' className='mt-4' disabled={isSubmitting}>
                    {isSubmitting ? 'Signing In...' : 'Sign In'}
                </Button>
                <Button type='button' className='mt-2' onClick={handleGoogleSignIn}>
                    Sign in with Google
                </Button>
            </form>
        </div>
    );
}
