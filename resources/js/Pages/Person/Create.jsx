import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import React, { useState } from "react";
import { Head, useForm, usePage } from "@inertiajs/react";

import PersonalForm from "./PersonalForm";
import BdlForm from "./BdlForm";
import RpoMeaForm from "./RpoMeaForm";

const Create = ({ person = null }) => {
    const [activeForm, setActiveForm] = useState("personal");

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />
            <div className="flex mt-10">
                {/* Sidebar */}
                <div className="w-1/6 bg-white-100 p-4">
                    <ul>
                        <li
                            className={`cursor-pointer p-2 ${
                                activeForm === "personal" ? "font-bold" : ""
                            }`}
                            onClick={() => setActiveForm("personal")}
                        >
                            Personal Details
                        </li>
                        {person ? (
                            <>
                                <li
                                    className={`cursor-pointer p-2 ${
                                        activeForm === "bdl" ? "font-bold" : ""
                                    }`}
                                    onClick={() => setActiveForm("bdl")}
                                >
                                    BDL Details
                                </li>
                                <li
                                    className={`cursor-pointer p-2 ${
                                        activeForm === "rpo_mea"
                                            ? "font-bold"
                                            : ""
                                    }`}
                                    onClick={() => setActiveForm("rpo_mea")}
                                >
                                    RPO & MEA
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="p-2">BDL details</li>
                                <li className="p-2">RPO & MEA</li>
                            </>
                        )}
                    </ul>
                </div>

                {/* Forms */}
                <div className="w-3/4 p-4">
                    {activeForm === "personal" && (
                        <PersonalForm person={person} />
                    )}
                    {activeForm === "bdl" && <BdlForm person={person} />}
                    {activeForm === "rpo_mea" && <RpoMeaForm person={person} />}
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Create;
