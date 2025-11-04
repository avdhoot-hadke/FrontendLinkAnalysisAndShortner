
import { motion } from "framer-motion";

const Card = ({ title, desc }: { title: any, desc: any }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{
                opacity: 1,
                y: 0,
            }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="shadow-custom  flex flex-col px-4 py-8  gap-3 rounded-sm"
        >
            <h1 className="text-slate-900 text-xl font-bold ">{title}</h1>
            <p className="text-slate-700 text-sm"> {desc}</p>
        </motion.div>
    );
};

export default Card;