import AuthenticatedLayout from "../../Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";

export default function Index({ people }) {
    console.log(people);

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="text-gray-900 mb-5 text-lg font-bold">
                            List of poeple
                        </div>
                        <Table>
                            <TableCaption>
                                A list of person created.
                            </TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">
                                        Id
                                    </TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Gender</TableHead>
                                    <TableHead className="text-right">
                                        Date of birth
                                    </TableHead>
                                    <TableHead className="text-right">
                                        Applying for
                                    </TableHead>
                                    <TableHead className="text-right">
                                        BDL receipt number
                                    </TableHead>
                                    <TableHead className="text-right">
                                        Submission date
                                    </TableHead>
                                    <TableHead className="text-right">
                                        MEA number
                                    </TableHead>
                                    <TableHead className="text-right">
                                        Actions
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {people.data.map((person) => (
                                    <TableRow
                                        key={person.id}
                                        className="cursor-pointer hover:bg-gray-100"
                                    >
                                        <TableCell key={person.id}>
                                            {person.id}
                                        </TableCell>
                                        <TableCell>{person.name}</TableCell>
                                        <TableCell>{person.gender}</TableCell>
                                        <TableCell className="text-right">
                                            {person.dob}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            {person.case_type}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            {person.BDL_receipt_number}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            {person.submission_date}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            {person.MEA_number}
                                        </TableCell>
                                        <TableCell>
                                            <Link
                                                className="px-3"
                                                href={route(
                                                    "person.create",
                                                    person.id
                                                )}
                                            >
                                                <Button className="px-2">
                                                    edit
                                                </Button>
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
