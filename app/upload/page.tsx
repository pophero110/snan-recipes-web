"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Plus, Minus } from "lucide-react";

export default function UploadRecipePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("/placeholder.svg?height=300&width=400");
  const [ingredients, setIngredients] = useState([""]);
  const [instructions, setInstructions] = useState([
    { text: "", duration: "" },
  ]);
  const [cookTime, setCookTime] = useState("");
  const [servings, setServings] = useState("");

  useEffect(() => {
    const nameFromUrl = searchParams.get("name");
    if (nameFromUrl) {
      setName(decodeURIComponent(nameFromUrl));
    }
  }, [searchParams]);

  const handleIngredientChange = (index: number, value: string) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  const handleInstructionChange = (
    index: number,
    field: "text" | "duration",
    value: string
  ) => {
    const newInstructions = [...instructions];
    newInstructions[index] = { ...newInstructions[index], [field]: value };
    setInstructions(newInstructions);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, ""]);
  };

  const removeIngredient = (index: number) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients);
  };

  const addInstruction = () => {
    setInstructions([...instructions, { text: "", duration: "" }]);
  };

  const removeInstruction = (index: number) => {
    const newInstructions = instructions.filter((_, i) => i !== index);
    setInstructions(newInstructions);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRecipe = {
      id: Date.now().toString(),
      name,
      description,
      image,
      ingredients: ingredients.filter((i) => i.trim() !== ""),
      instructions: instructions
        .filter((i) => i.text.trim() !== "")
        .map((i) => ({
          text: i.text,
          duration: i.duration ? parseInt(i.duration) : undefined,
        })),
      cookTime: parseInt(cookTime),
      servings: parseInt(servings),
    };

    // Get existing recipes from local storage
    const existingRecipes = JSON.parse(localStorage.getItem("recipes") || "[]");

    // Add new recipe
    const updatedRecipes = [...existingRecipes, newRecipe];

    // Save updated recipes to local storage
    localStorage.setItem("recipes", JSON.stringify(updatedRecipes));

    // Redirect to home page
    router.push("/");
  };

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <Link
        href="/"
        className="text-gray-600 hover:underline mb-4 inline-flex items-center"
      >
        <ArrowLeft size={20} className="mr-2" />
        Back to recipes
      </Link>
      <h1 className="text-3xl font-light mb-6">Upload New Recipe</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Recipe Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div>
          <label
            htmlFor="cookTime"
            className="block text-sm font-medium text-gray-700"
          >
            Cook Time (minutes)
          </label>
          <input
            type="number"
            id="cookTime"
            value={cookTime}
            onChange={(e) => setCookTime(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div>
          <label
            htmlFor="servings"
            className="block text-sm font-medium text-gray-700"
          >
            Servings
          </label>
          <input
            type="number"
            id="servings"
            value={servings}
            onChange={(e) => setServings(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Ingredients
          </label>
          {ingredients.map((ingredient, index) => (
            <div key={index} className="flex items-center mt-2">
              <input
                type="text"
                value={ingredient}
                onChange={(e) => handleIngredientChange(index, e.target.value)}
                className="block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
              <button
                type="button"
                onClick={() => removeIngredient(index)}
                className="ml-2 p-2 bg-gray-200 rounded-full"
              >
                <Minus size={16} />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addIngredient}
            className="mt-2 p-2 bg-gray-200 rounded-full"
          >
            <Plus size={16} />
          </button>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Instructions
          </label>
          {instructions.map((instruction, index) => (
            <div key={index} className="flex items-center mt-2">
              <textarea
                value={instruction.text}
                onChange={(e) =>
                  handleInstructionChange(index, "text", e.target.value)
                }
                className="block w-full border border-gray-300 rounded-md shadow-sm p-2"
                placeholder="Instruction step"
              />
              <input
                type="number"
                value={instruction.duration}
                onChange={(e) =>
                  handleInstructionChange(index, "duration", e.target.value)
                }
                className="ml-2 w-20 border border-gray-300 rounded-md shadow-sm p-2"
                placeholder="Minutes"
              />
              <button
                type="button"
                onClick={() => removeInstruction(index)}
                className="ml-2 p-2 bg-gray-200 rounded-full"
              >
                <Minus size={16} />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addInstruction}
            className="mt-2 p-2 bg-gray-200 rounded-full"
          >
            <Plus size={16} />
          </button>
        </div>
        <button
          type="submit"
          className="w-full bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
        >
          Upload Recipe
        </button>
      </form>
    </div>
  );
}
