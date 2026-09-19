import Anthropic from "@anthropic-ai/sdk";

import { NextResponse } from "next/server";

const client = new Anthropic({
  apiKey: process.env["ANTHROPIC_API_KEY"]
});

export async function POST(request: Request) {
  const { items, filters } = await request.json();

  const message = await client.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: `
          Create a recipe from ONLY those ingredients ${items.join(", ")}
          Applay those constraints to the recipe: ${filters.join(", ") || "no additional constraints"}
          IMPORTANT: Try to be creative and don't always go for the obvious recipe.
          IMPORTANT: Before making the recipe, think of about 5 dishes that can be made from the provided ingredients and respond with only one of them at random. Do NOT tell me about the other options.
        `
      }
    ]
  });

  console.log("////////// ", message.content);

  const block = message.content.find((block) => block.type === "text");

  return NextResponse.json({
    recipe: block?.text ?? ""
  });
}
