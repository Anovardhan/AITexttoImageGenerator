import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const generateImage = async (e) => {
    e.preventDefault();
    setLoading(true);
    setImageUrl("");
    setErrorMsg("");

    const url =
      "https://ai-text-to-image-generator-flux-free-api.p.rapidapi.com/aaaaaaaaaaaaaaaaaiimagegenerator/fluximagegenerate/generateimage.php";

    const options = {
      method: "POST",
      headers: {
        "x-rapidapi-key": "7c17d9fe0cmsh1877d5c5329a600p1752ccjsn7f08f048c85e",
        "x-rapidapi-host":
          "ai-text-to-image-generator-flux-free-api.p.rapidapi.com",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        prompt: prompt,
        width: "1024",
        height: "1024",
        seed: "918440",
        model: "flux",
      }),
    };

    try {
      const response = await fetch(url, options);
      const blob = await response.blob();
      const imageObjectUrl = URL.createObjectURL(blob);
      setImageUrl(imageObjectUrl);
    } catch (error) {
      console.error("Fetch Error:", error);
      setErrorMsg("Failed to generate image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">AI Text to Image Generator</h2>

      <form onSubmit={generateImage} className="mb-4">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Enter a prompt like 'Iron Man and Spider-Man'"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-primary">
            Generate
          </button>
        </div>
      </form>

      {loading && <p className="text-center">Generating image...</p>}

      {errorMsg && (
        <div className="alert alert-danger text-center">{errorMsg}</div>
      )}

      {imageUrl && (
        <div className="text-center">
          <img
            src={imageUrl}
            alt="AI generated"
            className="img-fluid rounded shadow"
          />
          <div className="mt-3">
            <a
              href={imageUrl}
              download="generated-image.jpg"
              className="btn btn-success"
            >
              Download Image
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
