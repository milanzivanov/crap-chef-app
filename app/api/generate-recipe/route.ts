import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";
import { z } from "zod";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod.mjs";

const client = new Anthropic({
  apiKey: process.env["ANTHROPIC_API_KEY"]
});

const RecipeSchema = z.object({
  title: z.string(),
  description: z.string(),
  cookTimeMinutes: z.number(),
  servings: z.number(),
  ingredients: z.array(
    z.object({
      name: z.string(),
      quantity: z.string()
    })
  ),
  steps: z.array(z.string()),
  notes: z.array(z.string())
});

export async function POST(request: Request) {
  const { items, filters } = await request.json();

  const message = await client.messages.parse({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 1024,
    output_config: {
      format: zodOutputFormat(RecipeSchema)
    },
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

  console.log("////////// ", message.parsed_output);

  const block = message.content.find((block) => block.type === "text");

  return NextResponse.json({
    recipe: block?.text ?? ""
  });
}
