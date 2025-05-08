import { validateDataTask, validatePartialTask } from "../libs/taskSchema.js";
import {
  createOneTask,
  deleteTaskById,
  findOneTask,
  getAllTaskByUser,
  updateOneTask,
} from "../models/tasks.model.js";

export const creatNewTask = async (req, res) => {
  const id = req.id;
  const { title, description } = req.body;

  try {
    const validateData = validateDataTask(req.body);
    if (validateData.error) {
      return res.status(400).json({
        status: "failed",
        message: JSON.parse(validateData.error.message),
      });
    }

    const titleUpper = title.toUpperCase();
    const descriptionLower = description.toLowerCase();

    const findTask = await findOneTask(titleUpper);

    if (findTask.rowCount === 1) {
      return res
        .status(400)
        .json({ status: "failed", message: "Title already exists" });
    }

    const newTask = await createOneTask(id, titleUpper, descriptionLower);

    return res.status(201).json({
      status: "success",
      message: "Task created successfully",
      task: newTask,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "failed", message: "Internal server error" });
  }
};

export const getAllTask = async (req, res) => {
  try {
    const getTask = await getAllTaskByUser(req.id);

    if (getTask.length < 1) {
      return res
        .status(404)
        .json({ status: "failed", message: "No tasks user" });
    }

    return res
      .status(200)
      .json({ status: "success", message: "Tasks user", tasks: getTask });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "failed", message: "Internal server error" });
  }
};

export const updateTask = async (req, res) => {
  const { taskId, newTitle, newDescription } = req.body;

  try {
    const validateData = validatePartialTask(req.body);
    if (validateData.error) {
      return res.status(400).json({
        status: "failed",
        message: JSON.parse(validateData.error.message),
      });
    }

    const newTitleUpper = newTitle.toUpperCase();
    const newDescriptionLower = newDescription.toLowerCase();

    const findTask = await findOneTask(newTitleUpper);
    if (findTask.rowCount === 1) {
      return res
        .status(400)
        .json({ status: "failed", message: "Title already exists" });
    }

    const updateOneTaskById = await updateOneTask(
      newTitleUpper,
      newDescriptionLower,
      taskId
    );

    if (!updateOneTask) {
      return res
        .status(400)
        .json({ status: "failed", message: "Error update task" });
    }

    return res.status(214).json({
      status: "success",
      message: "Task update successfully",
      task: updateOneTaskById,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "failed", message: "Internal server error" });
  }
};

export const deleteTask = async (req, res) => {
  const { taskId } = req.body;
  const userId = req.id;
  try {
    if (!taskId || !userId) {
      return res.status(400).json({
        status: "failed",
        message: "Error searching for user or task IDS",
      });
    }

    const taskIdToNum = Number(taskId);
    const userIdToNum = Number(userId);

    const deleteTask = await deleteTaskById(taskIdToNum, userIdToNum);

    if (deleteTask.rowCount <= 0) {
      return res
        .status(400)
        .json({ status: "failed", message: "Error delete task" });
    }

    return res
      .status(200)
      .json({ status: "success", message: "Task delete successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "failed", message: "Internal server error" });
  }
};
