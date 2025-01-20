import model from "@/config/geminiConfig";
import { useState } from "react";
import useAuthContext from "../apis/context/useAuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "../use-toast";

function usePromptResponse() {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const { auth, setAuth } = useAuthContext();
  const { id } = useParams();
  const navigate = useNavigate();

  async function getResponseFromPrompt(userPrompt = "") {
    if (!auth?.user?.isSubscribed) {
      navigate(`/workspace/${id}/subscribe`);
      toast({
        title: "You need to subscribe to use this feature",
        description: "You need to subscribe to use this feature",
        type: "error",
      });
    }

    try {
      setLoading(true);
      setError(null);
      setSuccess(false);
      setResponse(null);
      const result = await model.generateContent(`
                Act as a professional Slack writing assistant. 
                Follow these guidelines: respond with clear, concise, and professional workplace communication, maintain a polite and collaborative tone, and ensure grammatical accuracy. 
                Provide examples if needed and keep responses brief unless otherwise specified.
                Now, respond to this user request: ${userPrompt}`);
      const response = await result.response;
      const text = await response.text();
      setResponse(text);
      setSuccess(true);
      return text;
    } catch (err) {
      setError(err);
      setSuccess(false);
      return null;
    } finally {
      setLoading(false);
    }
  }

  return {
    response,
    loading,
    error,
    success,
    getResponseFromPrompt,
  };
}

export default usePromptResponse;
