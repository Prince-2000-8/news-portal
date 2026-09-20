import News from "../models/News.js";

export const getTopNews = async (req, res) => {
  try {
    const topNews = await News.find()
      .sort({ views: -1, createdAt: -1 })
      .limit(6)
      .populate("author", "name avatar");
    res.json(topNews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllNews = async (req, res) => {
  try {
    const pageSize = Number(req.query.limit) || 9;
    const page = Number(req.query.page) || 1;
    const category = req.query.category;
    const keyword = req.query.keyword;

    const filter = {};
    if (category && category !== "All") filter.category = category;
    if (keyword) filter.$text = { $search: keyword };

    const count = await News.countDocuments(filter);
    const news = await News.find(filter)
      .populate("author", "name avatar")
      .sort({ createdAt: -1 })
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.json({ news, page, pages: Math.ceil(count / pageSize), total: count });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getNewsById = async (req, res) => {
  try {
    const news = await News.findById(req.params.id).populate("author", "name avatar bio");
    if (!news) return res.status(404).json({ message: "News not found" });

    news.views += 1;
    await news.save();

    res.json(news);
  } catch (error) {
    res.status(500).json({ message: "News not found" });
  }
};

export const getMyNews = async (req, res) => {
  try {
    const news = await News.find({ author: req.user._id }).sort({ createdAt: -1 });
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createNews = async (req, res) => {
  try {
    const { title, summary, content, image, category } = req.body;
    if (!title || !summary || !content) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }
    const news = await News.create({
      title,
      summary,
      content,
      image,
      category,
      author: req.user._id,
    });
    res.status(201).json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateNews = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) return res.status(404).json({ message: "News not found" });

    if (news.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to edit this news" });
    }

    news.title = req.body.title ?? news.title;
    news.summary = req.body.summary ?? news.summary;
    news.content = req.body.content ?? news.content;
    news.image = req.body.image ?? news.image;
    news.category = req.body.category ?? news.category;

    const updated = await news.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteNews = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) return res.status(404).json({ message: "News not found" });

    if (news.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this news" });
    }

    await news.deleteOne();
    res.json({ message: "News deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
