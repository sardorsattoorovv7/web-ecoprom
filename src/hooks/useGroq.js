
// src/hooks/useGroq.js
import { useState } from "react";
import { GROQ_CONFIG } from "../config/groq";

export function useGroq() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendMessage = async (messages) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${GROQ_CONFIG.apiKey}`
        },
        body: JSON.stringify({
          model: GROQ_CONFIG.model,
          messages: [
            { role: "system", content: GROQ_CONFIG.systemPrompt },
            ...messages
          ],
          temperature: GROQ_CONFIG.temperature,
          max_tokens: GROQ_CONFIG.maxTokens,
        })
      });

      if (!response.ok) throw new Error("API xatolik");
      
      const data = await response.json();
      return data.choices[0].message.content;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { sendMessage, isLoading, error };
}