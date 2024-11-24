'use client';
import { useForm } from 'react-hook-form';
import { emailV } from '../validationRules';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Input, Button } from '@nextui-org/react';
import useFindUsername from '@/hooks/userHooks/useFindUsername';
import Swal from 'sweetalert2';
import { ErrorMessage } from '@hookform/error-message';

type Findusername = {
    email: string;
}

export default function FindUsername() {
    const router = useRouter();
    const { mutate, isPending } = useFindUsername();

    const { register, handleSubmit, formState: { errors } } = useForm<Findusername>({
        mode: 'onChange', // 입력 값이 변경될 때마다 유효성 검사
        reValidateMode: 'onChange', // 입력 값이 변경될 때마다 유효성 검사
    });

    const onSubmit = (data: Findusername) => {
        const email = data.email;
        if (!email) return;
        mutate(email, {
            onSuccess: () => {
                Swal.fire({
                    icon: 'success',
                    title: '아이디 전송 성공',
                    showConfirmButton: false,
                    timer: 1500
                });
                router.push('/login-ui');
            },
            onError: () => {
                Swal.fire({
                    icon: 'error',
                    title: '아이디 전송 실패',
                    text: '이메일 주소를 확인해주세요',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-1">
            <div className="p-10 sm:p-20 bg-white text-center shadow-md rounded-lg">
                <h3 className="text-xl sm:text-2xl text-gray-800 font-semibold mb-5">아이디 찾기</h3>
                <form className="flex flex-col mx-auto gap-5" onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        placeholder="이메일"
                        {...register('email', emailV)}
                    />
                    <ErrorMessage
                        errors={errors}
                        name="email"
                        render={({ message }) => <p className='text-sm text-red-500 font-semibold'>{message}</p>}
                    /> 
                    <Button type='submit' color='primary' className='mt-5' isLoading={isPending}>이메일 전송</Button>
                    <Link href={'/login-ui'} className='text-xs sm:text-sm hover:text-blue-500 mt-3'><p>로그인으로 돌아가기</p></Link>
                </form>
            </div>
        </div>
    )
};