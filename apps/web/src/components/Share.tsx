"use client";

import React from "react";
import { Button } from "@smartleadmagnet/ui/components/ui/button";
import styled from "styled-components";
import ContentViewer from "@/components/ContentViewer";
import { LeadMagnet } from "@smartleadmagnet/database";

import useBuilder from "@/hooks/builder.hook"; // Import the custom hook
import BuilderElement from "@/components/BuilderElement";

const FormWrapper = styled.div`
  background-color: ${(props) => props.theme.backgroundColor};
  border: 1px solid #ccc;
  width: 90%;
  max-width: 600px;
  color: ${(props) => props.theme.textColor};
  margin: 0 auto;

  padding: 20px;
  border-radius: 5px;
  font-family: ${(props) => props.theme.selectedFont};
  .form-element {
    margin: 0 0 20px 0;
    padding: 0;
  }

  h1 {
    color: ${(props) => props.theme.titleColor};
  }

  h2 {
    color: ${(props) => props.theme.subtitleColor};
  }

  label {
    color: ${(props) => props.theme.labelColor};
    display: block;
    margin-bottom: 5px;
  }

  input {
    color: ${(props) => props.theme.textColor};
    &:focus {
      border-color: ${(props) => props.theme.buttonColor};
      outline: none;
    }
  }

  button[type="submit"] {
    background-color: ${(props) => props.theme.buttonColor};
    color: ${(props) => props.theme.buttonTextColor};
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background-color: darken(${(props) => props.theme.buttonColor}, 10%);
    }
  }
`;

export default function Builder({leadMagnet}: { leadMagnet: LeadMagnet }) {
	const {
		elementsList,
		removeElement,
		handleEdit,
		handleEditChange,
		formStyles,
		selectedView,
		imageUrl,
	} = useBuilder({leadMagnet}); // Use the custom hook
	
	
	return (
		<div className="py-10">
			<FormWrapper
				theme={formStyles}
				className={`form-${formStyles.selectedFormStyle}`}
			>
				{selectedView === "Form" ? (
					<>
						{elementsList.length &&
							elementsList.map((item: any) => (
								<div>
									<div className="form-item">
										<BuilderElement
											type={item.type}
											data={item}
											editable={false}
											updateData={handleEditChange}
											onEdit={() => {
												handleEdit(item);
											}}
											onDelete={() => removeElement(item.id)}
										/>
									</div>
								</div>
							))}
						<div className="form-item text-center">
							<Button type="submit">{formStyles.buttonText}</Button>
						</div>
					</>
				) : (
					<>
						{/* <ContentViewer
                    type="text"
                    content={textContent}
                      /> */}
						{/* <ContentViewer
                      type="markdown"
                      content={markdownContent}
                        /> */}
						{/* <ContentViewer
                      type="code"
                      content={codeContent}
                        /> */}
						<ContentViewer type="image" content={imageUrl}/>
					</>
				)}
				<p className="text-center py-[20px]">This form is created by <a
					href="https://smartleadmagnet.com/">SmartLeadMagnet</a></p>
			</FormWrapper>
		</div>
	);
}
