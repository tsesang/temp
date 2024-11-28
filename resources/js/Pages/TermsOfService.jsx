import React from 'react';
import { Head } from '@inertiajs/react';
import AuthenticationCardLogo from '@/Components/AuthenticationCardLogo';

const TermsOfService = ({ terms }) => {
    return (
        <>
            <Head title="Terms of Service" />

            <div className="font-sans antialiased text-gray-900 dark:text-gray-100">
                <div className="pt-4 bg-gray-100 dark:bg-gray-900">
                    <div className="flex flex-col items-center min-h-screen pt-6 sm:pt-0">
                        <div>
                            <AuthenticationCardLogo />
                        </div>

                        <div
                            className="w-full p-6 mt-6 overflow-hidden prose bg-white shadow-md sm:max-w-2xl dark:bg-gray-800 sm:rounded-lg dark:prose-invert"
                            dangerouslySetInnerHTML={{ __html: terms }}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default TermsOfService;
