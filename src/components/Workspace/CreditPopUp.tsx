"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useMyContext } from "@/context/CodeAgeContext";
import React from "react";

function CreditPopUp() {
    const { openCredit, setOpenCredit } = useMyContext();
    const changopen = (value: boolean) => {
        setOpenCredit(value)
    }
    return (
        <Dialog open={openCredit} onOpenChange={changopen}>
            <DialogContent className="sm:max-w-[425px] bg-black">
                <DialogHeader>
                    <DialogTitle>Credit Reached</DialogTitle>
                    <DialogDescription>You reached your free limit please enter gemini api key to continue</DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default CreditPopUp
