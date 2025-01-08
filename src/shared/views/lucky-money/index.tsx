"use client"
import { Button } from "@/shared/components/atoms/Button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/components/atoms/Dialog";
import { Input } from "@/shared/components/atoms/Input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/shared/components/atoms/Tooltip";
import LuckyMoneyCard from "@/shared/components/luckey-money-card/LuckyMoneyCard";
import { PagePath } from "@/shared/constant";
import { useCreateLuckyMoneyMutation, useGetLuckyMoneysQuery } from "@/shared/slices/lucky-money/lucky-money.api";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from 'yup';

const schema = yup.object().shape({
    name: yup.string().required('Hãy nhập tên của lì xì'),
});

const LuckyMoneyPage = () => {
    const router = useRouter();

    const [isOpenCreateDialog, setIsOpenCreateDialog] = useState(false);
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm({
        resolver: yupResolver(schema)
    });
    const [createLuckyMoney, { isLoading: isCreatingLuckyMoney }] = useCreateLuckyMoneyMutation();
    const {
        data: luckyMoneys,
        isLoading: isGettingLuckyMoneys,
        refetch
    } = useGetLuckyMoneysQuery();


    const handleOpenDialog = () => {
        setIsOpenCreateDialog(true)
    }

    const onSubmit = async (data) => {
        try {
            setIsOpenCreateDialog(false);
            reset()
            const luckyMoney = await createLuckyMoney(data)
            await refetch()
            router.push(`${PagePath.LUCKY_MONEY}/${luckyMoney.data.id}`)
        } catch (error) {
            console.error(error)
        }
    };

    const handleCloseDialog = () => {
        setIsOpenCreateDialog(false);
        reset()
    };

    return <div >
        <div>
            <div className="mb-6">
                {
                    !luckyMoneys || luckyMoneys?.length === 0 ?
                        <div>Bạn chưa có lì xì nào? Hãy tạo lì xì</div>
                        : <div className="grid grid-cols-4 gap-4">
                            {luckyMoneys?.map(luckyMoney => <LuckyMoneyCard key={luckyMoney.id} luckyMoney={luckyMoney} />)}
                        </div>
                }
            </div>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant='outline' onClick={handleOpenDialog}>+</Button>
                    </TooltipTrigger>
                    <TooltipContent>Thêm lì xì</TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
        <Dialog open={isOpenCreateDialog} onOpenChange={handleCloseDialog}>
            <DialogContent aria-describedby='' className=''>
                <DialogHeader>
                    <DialogTitle className="text-center">Tạo Lì xì</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>
                    <div className="flex flex-col gap-3">
                        <div className="flex flex-col gap-1">
                            <div>
                                Tên lì xì:
                            </div>
                            <Input
                                {...register('name')}
                                placeholder="Tên lì xì"
                                className={`border ${errors.name ? 'border-red' : 'border-gray-300'} rounded pr-10`}
                            />
                            {errors.name && <p className='text-red text-[13px]'>{errors.name.message}</p>}
                        </div>
                    </div>
                    <div className='mt-4 flex justify-end gap-4'>
                        <Button type='submit' disabled={isSubmitting || isCreatingLuckyMoney}>
                            Thêm
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    </div>;
};

export default LuckyMoneyPage;
