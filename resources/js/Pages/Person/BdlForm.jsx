import { useForm } from "@inertiajs/react";

import { Input } from "@/components/ui/input";

const BdlForm = ({ person, personId }) => {
    const { data, setData, put, processing, errors } = useForm({
        BDL_receipt_number: person ? person.BDL_receipt_number : "BDL-",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (person) {
            put(route("person.update.bdl", person.id));
        } else {
            put(route("person.update.bdl", personId));
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label>Enter BDL number </label>

                <Input
                    type="text"
                    placeholder="Enter BDL receipt number"
                    value={data.BDL_receipt_number}
                    onChange={(e) =>
                        setData("BDL_receipt_number", e.target.value)
                    }
                />
                {errors.name && (
                    <div className="text-red-500">{errors.name}</div>
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

export default BdlForm;
