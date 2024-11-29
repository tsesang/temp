import { useForm } from "@inertiajs/react";

import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

const RpoMeaForm = ({ person }) => {
    const { data, setData, put, processing, errors } = useForm({
        submission_date: person ? person.submission_date : "",
        MEA_number: person ? person.MEA_number : "MEA-",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("person.update.rpo_mea", person.id));
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label>MEA number </label>
                <Input
                    type="text"
                    placeholder="Enter Person name"
                    value={data.MEA_number}
                    onChange={(e) => setData("MEA_number", e.target.value)}
                />
                {errors.MEA_number && (
                    <div className="text-red-500">{errors.MEA_number}</div>
                )}
            </div>
            <div>
                <label>Submission date</label>
                <br />
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            className={`w-[280px] justify-start text-left font-normal ${
                                !data.submission_date
                                    ? "text-muted-foreground"
                                    : ""
                            }`}
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {data.submission_date ? (
                                format(new Date(data.submission_date), "PPP")
                            ) : (
                                <span>Pick a date</span>
                            )}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar
                            mode="single"
                            selected={
                                data.submission_date
                                    ? new Date(data.submission_date)
                                    : ""
                            }
                            onSelect={(value) =>
                                setData("submission_date", value)
                            }
                            initialFocus
                        />
                    </PopoverContent>
                </Popover>
                {errors.submission_date && (
                    <div className="text-red-500">{errors.submission_date}</div>
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

export default RpoMeaForm;
