import { User } from "~/models/user";
import { Product } from "~/models/product";
import { convertCurrency } from "~/configs";

const controlGetUpgradePage = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("carts");
        const results = await Product.find({ status: true }).select("title price old_price description");

        const products = results.map((result) => {
            const { _id, title, price, old_price, description } = result;
            console.log("user.carts :", user.carts);

            let register = user.carts.product_id?.toString() === _id.toString();

            return {
                id: _id,
                title,
                register,
                price: convertCurrency(price),
                old_price: convertCurrency(old_price),
                description: description,
            };
        });

        console.log("products :", products);

        res.render("upgrade", { products });
    } catch (error) {
        console.log("error :", error);
        res.redirect("/login");
    }
};

export default controlGetUpgradePage;
