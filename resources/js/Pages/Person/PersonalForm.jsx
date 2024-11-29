import { useForm } from "@inertiajs/react";

import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

const PersonalForm = ({ person, onComplete }) => {
    const { data, setData, put, post, processing, errors } = useForm({
        name: person ? person.name : "",
        gender: person ? person.gender : "",
        dob: person ? person.dob : null,
        case_type: person ? person.case_type : "",
    });

    const $gender_options = ["male", "female", "others"];
    const $case_type_options = [
        "processing",
        "completed",
        "pick up ready",
        "objection",
    ];

    const handleSubmit = (e) => {
        e.preventDefault();

        if (person) {
            put(route("person.update.personal", person.id));
        } else {
            post(route("person.store.personal"), {
                onSuccess: (response) => {
                    // Assuming the response contains the new person's ID
                    const newPersonId = response?.props?.person?.id;
                    if (newPersonId && onComplete) {
                        onComplete(newPersonId); // Pass the ID back to parent
                    }
                },
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {person ? (
                ""
            ) : (
                <p className="text-red-500">
                    Please fill the personal form to proceed to fill other
                    forms.
                </p>
            )}
            <div>
                <label>Name</label>

                <Input
                    type="text"
                    placeholder="Enter Person name"
                    value={data.name}
                    onChange={(e) => setData("name", e.target.value)}
                />
                {errors.name && (
                    <div className="text-red-500">{errors.name}</div>
                )}
            </div>
            <div>
                <label>Gender</label>

                <Select
                    value={data.gender}
                    onValueChange={(value) => setData("gender", value)}
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue
                            placeholder={
                                person ? data.gender : `--select gender--`
                            }
                        />
                    </SelectTrigger>
                    <SelectContent>
                        {$gender_options.map((gender) => (
                            <SelectItem key={gender} value={gender}>
                                {gender}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {errors.gender && (
                    <div className="text-red-500">{errors.gender}</div>
                )}
            </div>
            <div>
                <label>Date of birth</label>
                <br />
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            className={`w-[280px] justify-start text-left font-normal ${
                                !data.dob ? "text-muted-foreground" : ""
                            }`}
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {data.dob ? (
                                format(new Date(data.dob), "PPP")
                            ) : (
                                <span>Pick a date</span>
                            )}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar
                            mode="single"
                            selected={data.dob ? new Date(data.dob) : ""}
                            onSelect={(value) => setData("dob", value)}
                            initialFocus
                        />
                    </PopoverContent>
                </Popover>
                {errors.dob && <div className="text-red-500">{errors.dob}</div>}
            </div>
            <div>
                <label>Applying For</label>
                <Select onValueChange={(value) => setData("case_type", value)}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue
                            placeholder={
                                person
                                    ? data.case_type
                                    : `--select applying for--`
                            }
                        />
                    </SelectTrigger>
                    <SelectContent>
                        {$case_type_options.map((type) => (
                            <SelectItem key={type} value={type}>
                                {type}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {errors.case_type && (
                    <div className="text-red-500">{errors.case_type}</div>
                )}
            </div>
            <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded"
                disabled={processing}
            >
                {processing ? "Saving..." : "Save Details"}
            </button>
        </form>
    );
};

export default PersonalForm;
