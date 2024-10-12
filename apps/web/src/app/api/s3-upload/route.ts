import { POST } from "next-s3-upload/route";
import { v4 } from "uuid";

const getFileExtension = (filename: string) => filename.split(".").pop();

const uploadAPIHandler = POST.configure({
	async key(req, filename) {
		const uniqueId = v4();
		const fileExtension = getFileExtension(filename);
		return `${uniqueId}.${fileExtension}`;
	},
});

// @ts-ignore
export { uploadAPIHandler as POST };
