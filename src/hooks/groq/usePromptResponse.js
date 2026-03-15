import { useState } from "react";
import useAuthContext from "../apis/context/useAuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "../use-toast";
import groq from "@/config/groq.config";

function usePromptResponse() {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const { auth } = useAuthContext();
  const { id } = useParams();
  const navigate = useNavigate();

  async function getResponseFromPrompt(userPrompt = "") {
    if (!auth?.user?.isSubscribed) {
      navigate(`/workspace/${id}/subscribe`);

      toast({
        title: "Subscription Required",
        description: "You need to subscribe to use this feature",
        type: "error",
      });

      return;
    }

    try {
      setLoading(true);
      setError(null);
      setSuccess(false);
      setResponse(null);

      const completion = await groq.chat.completions.create({
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "system",
            content:
              "You are a Slack writing assistant. Respond professionally and briefly.",
          },
          {
            role: "user",
            content: userPrompt,
          },
        ],
        temperature: 0.3,
        max_tokens: 120,
      });

      const text = completion.choices[0]?.message?.content;

      setResponse(text);
      setSuccess(true);

      return text;
    } catch (err) {
      console.error(err);
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
