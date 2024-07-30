const express = require("express");
const axios = require("axios");
const router = express.Router();

// Middleware for checking authentication, if required
// router.use(yourAuthMiddleware);

router.get("/categories/header", async (req, res) => {
  try {
    const response = await axios.get(
      "https://erp.bullman.fr/categories/header"
    );
    res.json(response.data);
  } catch (error) {
    res.status(error.response.status).json({ error: error.message });
  }
});

router.get("/categories/shop", async (req, res) => {
  try {
    const response = await axios.get("https://erp.bullman.fr/categories/shop");
    res.json(response.data);
  } catch (error) {
    res.status(error.response.status).json({ error: error.message });
  }
});

router.get("/sections/shop_by_categories", async (req, res) => {
  try {
    const response = await axios.get(
      "https://erp.bullman.fr/sections/shop_by_categories"
    );
    res.json(response.data);
  } catch (error) {
    res.status(error.response.status).json({ error: error.message });
  }
});

router.get("/our/packs", async (req, res) => {
  try {
    const response = await axios.get("https://erp.bullman.fr/packs");
    res.json(response.data);
  } catch (error) {
    res.status(error.response.status).json({ error: error.message });
  }
});

router.get("/our/packs/price/:price/weight/:weight", async (req, res) => {
  const { price, weight } = req.params;
  try {
    const url = `https://erp.bullman.fr/packs?price${price}&weight${weight}`;
    const response = await axios.get(url);
    // console.log(url);
    res.json(response.data);
  } catch (error) {
    res.status(error.response.status).json({ error: error.message });
  }
});

router.get("/most-viewed-products", async (req, res) => {
  try {
    const response = await axios.get(
      "https://erp.bullman.fr/most-viewed-products"
    );
    res.json(response.data);
  } catch (error) {
    res.status(error.response.status).json({ error: error.message });
  }
});

router.get("/best-seller-category-id", async (req, res) => {
  try {
    const response = await axios.get(
      "https://erp.bullman.fr/best-seller-category-id"
    );
    res.json(response.data);
  } catch (error) {
    res.status(error.response.status).json({ error: error.message });
  }
});

router.get("/categories/:id", async (req, res) => {
  try {
    const response = await axios.get(
      `https://erp.bullman.fr/category/${req.params.id}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(error.response.status).json({ error: error.message });
  }
});

router.get("/product/:id", async (req, res) => {
  try {
    const response = await axios.get(
      `https://erp.bullman.fr/product//${req.params.id}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(error.response.status).json({ error: error.message });
  }
});
router.get("/search/product/:text", async (req, res) => {
  try {
    const response = await axios.get(
      `https://erp.bullman.fr/product_search?term=${req.params.text}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(error.response.status).json({ error: error.message });
  }
});

// Modified routes with subcategory,promotion, limit, price and weight as params
// Helper function to construct URL based on non-null parameters
const constructUrl = (baseUrl, params) => {
  let url = baseUrl;
  const queryParams = [];

  for (const key in params) {
    if (params[key] !== null && params[key] !== "null") {
      queryParams.push(`${key}=${params[key]}`);
    }
  }

  if (queryParams.length > 0) {
    url += "?" + queryParams.join("&");
  }

  return url;
};

// Route 1: Order by list_price desc
router.get(
  "/categories/:id/subcategory/:subcategory/promotion/:promotion/limit/:number/order/list_price/desc/price/:price/weight/:weight",
  async (req, res) => {
    const { id, subcategory, promotion, number, price, weight } = req.params;

    const params = {
      subcategory_id: subcategory,
      delivery_promotions: promotion,
      order: "list_price+desc",
      limit: number,
      price,
      weight,
    };

    try {
      const url = constructUrl(`https://erp.bullman.fr/category/${id}`, params);
      // console.log(url);
      const response = await axios.get(url);
      res.json(response.data);
    } catch (error) {
      res.status(error.response.status).json({ error: error.message });
    }
  }
);

// Route 2: Order by list_price asc
router.get(
  "/categories/:id/subcategory/:subcategory/promotion/:promotion/limit/:number/order/list_price/asc/price/:price/weight/:weight",
  async (req, res) => {
    const { id, subcategory, promotion, number, price, weight } = req.params;

    const params = {
      subcategory_id: subcategory,
      delivery_promotions: promotion,
      order: "list_price+asc",
      limit: number,
      price,
      weight,
    };

    try {
      const url = constructUrl(`https://erp.bullman.fr/category/${id}`, params);
      //console.log(url);
      const response = await axios.get(url);
      res.json(response.data);
    } catch (error) {
      res.status(error.response.status).json({ error: error.message });
    }
  }
);

// Route 3: Order by name asc
router.get(
  "/categories/:id/subcategory/:subcategory/promotion/:promotion/limit/:number/order/name/asc/price/:price/weight/:weight",
  async (req, res) => {
    const { id, subcategory, promotion, number, price, weight } = req.params;

    const params = {
      subcategory_id: subcategory,
      delivery_promotions: promotion,
      order: "name+asc",
      limit: number,
      price,
      weight,
    };

    try {
      const url = constructUrl(`https://erp.bullman.fr/category/${id}`, params);
      //console.log(url);
      const response = await axios.get(url);
      res.json(response.data);
    } catch (error) {
      res.status(error.response.status).json({ error: error.message });
    }
  }
);

// Route 4: Order by name desc
router.get(
  "/categories/:id/subcategory/:subcategory/promotion/:promotion/limit/:number/order/name/desc/price/:price/weight/:weight",
  async (req, res) => {
    const { id, subcategory, promotion, number, price, weight } = req.params;

    const params = {
      subcategory_id: subcategory,
      delivery_promotions: promotion,
      order: "name+desc",
      limit: number,
      price,
      weight,
    };

    try {
      const url = constructUrl(`https://erp.bullman.fr/category/${id}`, params);
      //  console.log(url);
      const response = await axios.get(url);
      res.json(response.data);
    } catch (error) {
      res.status(error.response.status).json({ error: error.message });
    }
  }
);

module.exports = router;
