export const builderItems = [
  {
    title: "Layout Elements",
    dropletId: "layout_elements",
    children: [
      {
        label: "Title",
        value: "Title",
        icon: "title",
        type: "title",
        id: "1",
      },
      {
        label: "Subtitle",
        icon: "subtitle",
        type: "subtitle",
        value: "Subtitle",

        id: "2",
      },
      {
        label: "Paragraph",
        icon: "paragraph",
        type: "paragraph",
        value: "Paragraph",
        id: "3",
      },
      {
        label: "Separator",
        icon: "separator",
        value: "Separator",
        type: "separator",
        id: "4",
      },
    ],
  },
  {
    title: "Form Elements",
    dropletId: "form_elements",
    children: [
      {
        label: "Text Field",
        icon: "input",
        type: "text_field",
        id: "5",
        formElement: true,
      },
      {
        label: "Email Field",
        icon: "email",
        type: "email",
        id: "14",
        formElement: true,
      },
      {
        label: "Number Field",
        icon: "number",
        type: "number",
        id: "15",
        formElement: true,
      },
      {
        label: "Website URL",
        icon: "website",
        type: "website",
        id: "16",
        formElement: true,
      },
      {
        label: "Textarea",
        icon: "textarea",
        type: "textarea",
        id: "6",
        formElement: true,
      },
      {
        label: "Single Checkbox",
        icon: "checkbox",
        type: "checkbox",
        id: "7",
        formElement: true,
      },
      {
        label: "Chekbox Group",
        icon: "checkbox-group",
        type: "checkbox-group",
        formElement: true,
        options: [
          {
            label: "Option 1",
            value: "option1",
          },
          {
            label: "Option 2",
            value: "option2",
          },
          {
            label: "Option 3",
            value: "option3",
          },
        ],
        id: "12",
      },

      {
        label: "Radio",
        icon: "radio",
        type: "radio",
        id: "8",
        formElement: true,
        options: [
          {
            label: "Option 1",
            value: "option1",
          },
          {
            label: "Option 2",
            value: "option2",
          },
          {
            label: "Option 3",
            value: "option3",
          },
        ],
      },
      {
        label: "Dropdown",
        icon: "select",
        type: "select",
        id: "9",
        formElement: true,
        options: [
          {
            label: "Option 1",
            value: "option1",
          },
          {
            label: "Option 2",
            value: "option2",
          },
          {
            label: "Option 3",
            value: "option3",
          },
        ],
      },
      {
        label: "File",
        icon: "file",
        type: "file",
        id: "10",
        formElement: true,
      },
      {
        label: "Image",
        icon: "image",
        type: "image",
        id: "11",
        formElement: true,
      },
      {
        label: "Color Picker",
        icon: "color",
        type: "color",
        id: "20",
        formElement: true,
        value: "#000000",
      },
    ],
  },
];

export const formStyleOptions = [
  {
    label: "Default",
    value: "default",
  },
  {
    label: "Linear",
    value: "linear",
  },
  {
    label: "Round",
    value: "round",
  },
  {
    label: "Sharp",
    value: "sharp",
  },
];

export const templateCategories = [
  {
    name: "All",
    id: "all",
  },
  {
    name: "Marketing",
    id: "marketing",
  },
  {
    name: "SEO",
    id: "seo",
  },
  {
    name: "Design",
    id: "design",
  },
  {
    name: "Development",
    id: "development",
  },
  {
    name: "Fun Tools",
    id: "fun-tools",
  },
  {
    name: "Social Media",
    id: "social-media",
  },
  {
    name: "Content Creation",
    id: "content-creation",
  },
  {
    name: "Email Genrator",
    id: "email-genrator",
  },
  {
    name: "Hashtag Genrator",
    id: "hashtag-genrator",
  },
  {
    name: "Fitness",
    id: "fitness",
  },
  {
    name: "SALES",
    id: "sales",
  },
  {
    name: "Finance",
    id: "finance",
  },
  {
    name: "Other",
    id: "other",
  },
];
