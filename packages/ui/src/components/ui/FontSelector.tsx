import React, { useState } from "react";
import FontPicker from "font-picker-react";

const FontSelector: React.FC = () => {
    const [activeFontFamily, setActiveFontFamily] = useState<string>("Open Sans");
    const [searchTerm, setSearchTerm] = useState<string>("");

    return (
        <div>
            <FontPicker
                apiKey="AIzaSyAOSZtIN2QS_O1H3z6dsnle1rPBW7nxj9Y" // Replace with your actual API key
                activeFontFamily={activeFontFamily}
                onChange={(nextFont) => setActiveFontFamily(nextFont.family)}
                search={searchTerm} // Pass the search term
                onSearchChange={(term) => setSearchTerm(term)} // Update search term
            />
            <p className="apply-font" style={{ fontFamily: activeFontFamily }}>
                The font will be applied to this text.
            </p>
        </div>
    );
};

export default FontSelector;
