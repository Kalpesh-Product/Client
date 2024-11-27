import React from 'react'

const AvatarCellRenderer = (props) => {

    const {value} = props;
  return (
    
        <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center", // Aligns items vertically
        gap: "-10px", // Negative gap for overlapping
        width: "100%",
      }}
    >
      {value.map((avatarUrl, index) => (
        <img
          key={index}
          src={avatarUrl}
          alt={`Avatar ${index + 1}`}
          style={{
            width: "30px",
            height: "30px",
            borderRadius: "50%",
            border: "1px solid white",
            marginLeft: index > 0 ? "-10px" : "0", // Overlap effect for subsequent avatars
          }}
        />
      ))}
    </div>

   
  )
}

export default AvatarCellRenderer