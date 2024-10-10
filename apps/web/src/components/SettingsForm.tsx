import { Button } from "@smartleadmagnet/ui/components/ui/button";
import { Input } from "@smartleadmagnet/ui/components/ui/input";
import { Textarea } from "@smartleadmagnet/ui/components/ui/textarea";
import { Label } from "@smartleadmagnet/ui/components/ui/label";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue
} from "@smartleadmagnet/ui/components/ui/select";
import React, { useCallback, useEffect, useState } from "react";
import { useS3Upload } from "next-s3-upload";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import axios from "axios";
import { LeadMagnet } from "@smartleadmagnet/database";

interface Props {
	leadMagnet: LeadMagnet;
}

export default function SettingsForm({leadMagnet}: Props) {
	
	const {uploadToS3, files} = useS3Upload();
	const [uploading, setUploading] = useState(false);
	const [imageUrl, setImageUrl] = useState<string>(leadMagnet?.image || "");
	
	
	// State for form fields
	const [formData, setFormData] = useState({
		title: "",
		subtitle: "",
		description: "",
		category: "",
	});
	
	const updateData = async () => {
		try {
			await axios.post(`/api/lead/${leadMagnet.id}`, {
				image: imageUrl
			});
		} catch (e) {
			console.log(e);
		}
	};
	
	useEffect(() => {
		const handler = setTimeout(() => {
			updateData();
		}, 300); // Adjust the delay as needed
		
		return () => {
			clearTimeout(handler); // Cleanup the timeout on unmount or when prompt changes
		};
	}, [imageUrl]);
	
	
	const onDrop = useCallback(async (acceptedFiles: File[]) => {
		const file = acceptedFiles[0]; // Only take the first file
		if (file) {
			setUploading(true); // Set uploading to true when upload starts
			const {key} = await uploadToS3(file)
			
			setImageUrl(`${process.env.NEXT_PUBLIC_MEDIA_CDN_NAME}/${key}`);
			
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
	
	// Handle input change
	const handleChange = (e: any) => {
		const {name, value} = e.target;
		setFormData({...formData, [name]: value});
	};
	
	return (
		<div className="w-full flex flex-col bg-white p-4 rounded-md">
			{/* Icon Image Upload */}
			<div
				className="card bg-base-200 mx-auto mt-8 flex h-full min-h-[300px] w-full justify-start rounded-lg border-2 border-dashed align-middle"
				{...getRootProps()}
			>
				<div className="flex h-full w-full flex-col items-center justify-center align-middle">
					<input {...getInputProps()} />
					
					{imageUrl ? (
						// Show image thumbnail after upload
						<div className="thumbnail-container">
							<Image
								src={imageUrl}
								alt="Uploaded Thumbnail"
								height={200}
								width={200}
								className="rounded-lg max-h-[200px] w-auto"
							/>
							{files?.length > 0 && !uploading && (<h3 className="mt-5 text-center text-xl">Image Uploaded Successfully</h3>)}
						</div>
					) : (
						// Show upload button when no image is uploaded yet
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
			
			{/* Title Input */}
			<div className="form-control w-full my-4 mt-8">
				<Label>Title</Label>
				<Input
					name="title"
					value={formData.title}
					onChange={handleChange}
					placeholder="Enter title"
				/>
			</div>
			
			{/* Subtitle Input */}
			<div className="form-control w-full mb-4">
				<Label>Subtitle</Label>
				<Input
					name="subtitle"
					value={formData.subtitle}
					onChange={handleChange}
					placeholder="Enter subtitle"
				/>
			</div>
			
			{/* Description Textarea */}
			<div className="form-control w-full mb-4">
				<Label>Description</Label>
				<Textarea
					name="description"
					value={formData.description}
					onChange={handleChange}
					placeholder="Enter description"
				/>
			</div>
			
			{/* Category Select */}
			<div className="form-control w-full mb-4">
				<Label>Category</Label>
				<Select
					onValueChange={(value) => setFormData({...formData, category: value})}
				>
					<SelectTrigger>
						<SelectValue placeholder="Select a category"/>
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectLabel>Categories</SelectLabel>
							<SelectItem value="category1">Category 1</SelectItem>
							<SelectItem value="category2">Category 2</SelectItem>
							<SelectItem value="category3">Category 3</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>
			</div>
			
			{/* Submit Button */}
			<Button
				className="mt-4"
				onClick={() => console.log(formData)}
			>
				Save Settings
			</Button>
		</div>
	);
}
