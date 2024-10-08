import Builder from "@/components/Builder";
import { getLeadMagnetById } from "@smartleadmagnet/services";
import Share from "@/components/Share";



export default async function Page({ params }: { params: { id: string } }) {
	const leadMagnet = await getLeadMagnetById(params.id);
	
	console.log({ leadMagnet:leadMagnet?.components });


// 	const FormWrapper = styled.div`
//   background-color: ${(props) => props.theme.backgroundColor};
//   width: 90%;
//   max-width: 600px;
//   color: ${(props) => props.theme.textColor};
//   margin: 0 auto;

//   padding: 20px;
//   border-radius: 5px;
//   font-family: ${(props) => props.theme.selectedFont};
//   .form-element {
//     margin: 0 0 20px 0;
//     padding: 0;
//   }

//   h1 {
//     color: ${(props) => props.theme.titleColor};
//   }

//   h2 {
//     color: ${(props) => props.theme.subtitleColor};
//   }

//   label {
//     color: ${(props) => props.theme.labelColor};
//     display: block;
//     margin-bottom: 5px;
//   }

//   input {
//     color: ${(props) => props.theme.textColor};
//     &:focus {
//       border-color: ${(props) => props.theme.buttonColor};
//       outline: none;
//     }
//   }

//   button[type="submit"] {
//     background-color: ${(props) => props.theme.buttonColor};
//     color: ${(props) => props.theme.buttonTextColor};
//     padding: 10px 20px;
//     border: none;
//     border-radius: 5px;
//     cursor: pointer;

//     &:hover {
//       background-color: darken(${(props) => props.theme.buttonColor}, 10%);
//     }
//   }
// `;

	return (
		<Share leadMagnet={leadMagnet} />
	);
	
	
}
