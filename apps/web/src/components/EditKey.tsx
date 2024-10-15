import { Edit } from "lucide-react";

import { Button } from "@smartleadmagnet/ui/components/ui/button";

interface EditKeyProps {
  handleEdit: () => void;
}

export default function EditKey(props:EditKeyProps) {
  const {  handleEdit } = props;

  return (
    <>
      <div className="flex justify-end">
        <Button onClick={handleEdit} variant="outline" size="sm" className="flex items-center space-x-1">
          <Edit className="h-4 w-4" />
          <span>Edit</span>
        </Button>
      </div>
    </>
  );
}
