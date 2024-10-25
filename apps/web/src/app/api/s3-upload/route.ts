import { POST } from "next-s3-upload/route";
import { v4 } from "uuid";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const getFileExtension = (filename: string) => filename.split(".").pop();

// @ts-ignore
const uploadAPIHandler: typeof POST = POST.configure({
  async key(req, filename) {
    const uniqueId = v4();
    const fileExtension = getFileExtension(filename);
    return `${uniqueId}.${fileExtension}`;
  },
});

// @ts-ignore
export { uploadAPIHandler as POST };
