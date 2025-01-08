import Spinner from "@/components/molecules/Spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EditIcon, X } from "lucide-react";
import { useState } from "react";

function TextEdit({
  showInput,
  setShowInput,
  onSubmitFn,
  values,
  setValues,
  submitLoading,
  label,
}) {


  return (
    <div className="py-3 px-4 border border-input rounded-md leading-none">
      <div className="flex justify-between ">
        <p className="font-bold">{label}</p>
        <Button
          size="xs"
          onClick={() => setShowInput(!showInput)}
          className="p-1"
          variant="outline"
        >
          {showInput ? <X /> : <EditIcon />}
        </Button>
      </div>
      {showInput ? (
        <form onSubmit={onSubmitFn} className="flex gap-2 mt-2">
          <Input
            size="sm"
            type="text"
            required
            placeholder={label}
            minLength={3}
            maxLength={50}
            autoFocus
            value={values}
            onChange={(e) => setValues(e.target.value)}
          />
          <Button disabled={submitLoading} type="submit">
            {submitLoading ? <Spinner /> : "Save"}
          </Button>
        </form>
      ) : (
        <p>{values}</p>
      )}
    </div>
  );
}

export default TextEdit;
