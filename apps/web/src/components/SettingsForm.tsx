import { Button } from "@smartleadmagnet/ui/components/ui/button";
import { Input } from "@smartleadmagnet/ui/components/ui/input";
import { Label } from "@smartleadmagnet/ui/components/ui/label";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue
} from "@smartleadmagnet/ui/components/ui/select";
import React, { useCallback, useState } from "react";
import { useS3Upload } from "next-s3-upload";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { Controller, useForm } from "react-hook-form"; // Import react-hook-form
import { zodResolver } from "@hookform/resolvers/zod"; // Import zod resolver for react-hook-form
import ReactQuill from 'react-quill'; // Import ReactQuill
import 'react-quill/dist/quill.snow.css'; // Import Quill CSS
import templateCategories from "@/data/categories.json";
import { BuilderSchemaForm, builderSchemaForm } from "@/types/builder";
import { useBuilderContext } from "@/providers/BuilderProvider";

export default function SettingsForm() {
	const {updateSettingFormData, leadMagnet} = useBuilderContext();
	const {uploadToS3, files} = useS3Upload();
	const [uploading, setUploading] = useState(false);
	const [imageUrl, setImageUrl] = useState<string>(leadMagnet?.image || "");
	
	// Integrating react-hook-form with zod validation
	const {register, handleSubmit, setValue, control, formState: {errors, defaultValues}} = useForm<BuilderSchemaForm>({
		resolver: zodResolver(builderSchemaForm), // Use Zod schema for validation
		defaultValues: {
			image: leadMagnet.image || "",
			name: leadMagnet.name || "",
			tagline: leadMagnet.tagline || "",
			description: leadMagnet.description || "",
			category: leadMagnet.category || "",
		},
	});
	
	const onDrop = useCallback(async (acceptedFiles: File[]) => {
		const file = acceptedFiles[0]; // Only take the first file
		if (file) {
			setUploading(true); // Set uploading to true when upload starts
			const {key} = await uploadToS3(file);
			
			const url = `${process.env.NEXT_PUBLIC_MEDIA_CDN_NAME}/${key}`;
			setImageUrl(url);
			setValue("image", `${process.env.NEXT_PUBLIC_MEDIA_CDN_NAME}/${key}`)
			
			setUploading(false); // Set uploading to false when upload finishes
		}
	}, []);
	
	const {getRootProps, getInputProps} = useDropzone({
		onDrop,
		multiple: false, // Only allow one file to be dropped at a time
		accept: {
			'image/jpeg': [],
			'image/png': [],
			'image/webp': [],
			'image/heic': [],
			'image/jfif': [],
		},
	});
	
	const onSubmit = async (data: BuilderSchemaForm) => {
		await updateSettingFormData(data);
	};
	
	return (
		<form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col bg-white p-4 rounded-md">
			{/* Icon Image Upload */}
			<>
				<div
					className="card bg-base-200 mx-auto mt-8 flex h-full min-h-[300px] w-full justify-start rounded-lg border-2 border-dashed align-middle"
					{...getRootProps()}
				>
					<div className="flex h-full w-full flex-col items-center justify-center align-middle">
						<input {...getInputProps()} />
						
						{imageUrl ? (
							<div className="thumbnail-container">
								<Image
									src={imageUrl}
									alt="Uploaded Thumbnail"
									height={200}
									width={200}
									className="rounded-lg max-h-[200px] w-auto"
								/>
								{files?.length > 0 && !uploading && (
									<h3 className="mt-5 text-center text-xl">Image Uploaded Successfully</h3>)}
							</div>
						) : (
							<>
								<Button className="btn btn-primary flex flex-row">
									<IoCloudUploadOutline className="text-2xl mr-2"/>
									Please upload an image (JPG, PNG, GIF).
								</Button>
								<h3 className="mt-5 text-center text-xl">
									Drag and drop an image here, or click to select one
								</h3>
							</>
						)}
						{uploading && (
							<>
								<progress
									className="progress mt-10 w-56"
									value={(files?.[0]?.progress || 0) * 100}
									max="100"
								></progress>
								<span className="loading loading-infinity loading-lg"></span>
								<h3 className="text-xl">Uploading...</h3>
							</>
						)}
						
						{uploading && <div className="upload-overlay"/>}
					</div>
				</div>
				{errors.image && <p className="text-red-500">{errors.image.message}</p>}
			</>
			
			{/* Title Input */}
			<div className="form-control w-full my-4 mt-8">
				<Label>Title</Label>
				<Input
					{...register("name")}
					placeholder="Enter title"
				/>
				{errors.name && <p className="text-red-500">{errors.name.message}</p>}
			</div>
			
			{/* Subtitle Input */}
			<div className="form-control w-full mb-4">
				<Label>Tagline</Label>
				<Input
					{...register("tagline")}
					placeholder="Enter Tagline"
				/>
				{errors.tagline && <p className="text-red-500">{errors.tagline.message}</p>}
			</div>
			
			{/* Description ReactQuill */}
			<div className="form-control w-full mb-4">
				<Label>Description</Label>
				<Controller
					name="description"
					control={control}
					render={({field: {value, onChange}}) => (
						<ReactQuill
							value={value || ""}
							onChange={onChange}
							placeholder="Enter description"
							theme="snow"
							className="w-full"
							modules={{
								toolbar: [
									[{header: [1, 2, false]}],
									['bold', 'italic', 'underline', 'strike'],
									[{list: 'ordered'}, {list: 'bullet'}],
									['link'],
									['clean'], // Remove formatting button
								],
							}}
						/>
					)}
				/>
				{errors.description && <p className="text-red-500">{errors.description.message}</p>}
			</div>
			
			{/* Category Select */}
			<div className="form-control w-full mb-4">
				<Label>Category</Label>
				<Select
					defaultValue={defaultValues.category}
					onValueChange={(value) => setValue("category", value)}
				>
					<SelectTrigger>
						<SelectValue placeholder="Select a category"/>
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							{templateCategories.map((category) => (
								<SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
							))}
						</SelectGroup>
					</SelectContent>
				</Select>
				{errors.category && <p className="text-red-500">{errors.category.message}</p>}
			</div>
			
			{/* Submit Button */}
			<Button type="submit" className="mt-4">
				Save Settings
			</Button>
		</form>
	);
}
