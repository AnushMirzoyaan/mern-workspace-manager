import express from "express";
import Workspace from "../models/Workspace";

const router = express.Router();

router.post("/", async (req: any, res: any) => {
  const { name, slug, userId } = req.body;

  try {
    const existingWorkspace = await Workspace.findOne({ slug });
    if (existingWorkspace) {
      let suggestions = [];
      let counter = 1;
      while (suggestions.length < 2) {
        const newSlug = `${slug}${counter}`;
        const workspaceWithNewSlug = await Workspace.findOne({ slug: newSlug });
        if (!workspaceWithNewSlug) {
          suggestions.push(newSlug);
        }
        counter++;
      }

      return res.status(200).json({
        warning: "Slug already taken",
        suggestions,
        workspaceCreated: false,
      });
    }

    const workspace = new Workspace({ name, slug, userId });
    await workspace.save();

    return res.status(201).json({
      message: "Workspace created",
      workspace,
      workspaceCreated: true,
    });
  } catch (err) {
    console.error("Error creating workspace:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

router.get("/", async (req: any, res: any) => {
  try {
    const { userId } = req.query;
    const workspaces = await Workspace.find({ userId });
    return res.json(workspaces);
  } catch (err) {
    console.error("Error fetching workspaces:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

router.put("/:id", async (req: any, res: any) => {
  const { name, slug } = req.body;
  try {
    const workspace = await Workspace.findById(req.params.id);
    if (!workspace) {
      return res.status(404).json({ message: "Workspace not found" });
    }
    workspace.name = name;
    workspace.slug = slug;
    await workspace.save();
    return res.json({ message: "Workspace updated", workspace });
  } catch (err) {
    console.error("Error updating workspace:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

router.delete("/:id", async (req: any, res: any) => {
  try {
    const workspace = await Workspace.findById(req.params.id);
    if (!workspace) {
      return res.status(404).json({ message: "Workspace not found" });
    }
    await workspace.deleteOne();
    return res.json({ message: "Workspace deleted" });
  } catch (err) {
    console.error("Error deleting workspace:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

router.get("/slug/:slug", async (req: any, res: any) => {
  const { slug } = req.params;
  try {
    const existingWorkspace = await Workspace.findOne({ slug });
    if (existingWorkspace) {
      let suggestions = [];
      let counter = 1;
      while (suggestions.length < 2) {
        const newSlug = `${slug}${counter}`;
        const workspaceWithNewSlug = await Workspace.findOne({ slug: newSlug });
        if (!workspaceWithNewSlug) {
          suggestions.push(newSlug);
        }
        counter++;
      }
      return res.json({ available: false, suggestions });
    }
    return res.json({ available: true });
  } catch (err) {
    console.error("Error checking slug availability:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

export default router;
