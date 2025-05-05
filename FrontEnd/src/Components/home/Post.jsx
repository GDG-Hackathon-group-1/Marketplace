import React, { useState } from "react";

const PostModal = () => {
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemImage, setItemImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!itemImage) return alert("Choose an image");

    try {
      setLoading(true);

      // Prepare form data
      const formData = new FormData();
      formData.append("itemName", itemName);
      formData.append("itemDescription", itemDescription);
      formData.append("itemPrice", itemPrice);
      formData.append("itemImage", itemImage);

      // Send POST request to your API
      const res = await fetch("http://localhost:8000/api/items/", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to upload item");

      alert("Item uploaded successfully ✅");

      // Clear form
      setItemName("");
      setItemDescription("");
      setItemPrice("");
      setItemImage(null);
    } catch (err) {
      console.error("Upload error:", err.message);
      alert(`Upload failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="post-modal-form">
      <input
        type="text"
        placeholder="Item Name"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Item Description"
        value={itemDescription}
        onChange={(e) => setItemDescription(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Item Price"
        value={itemPrice}
        onChange={(e) => setItemPrice(e.target.value)}
        required
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setItemImage(e.target.files[0])}
        required
      />

      <button type="submit" className="upload-btn" disabled={loading}>
        {loading ? "Posting…" : "Post Item"}
      </button>
    </form>
  );
};

export default PostModal;
