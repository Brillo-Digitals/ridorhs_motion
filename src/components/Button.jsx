import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';
import { Link } from 'react-router-dom';

/**
 * Reusable Button component with Framer Motion hover animations.
 */
export default function Button({
    children,
    onClick,
    variant = 'primary',
    className = '',
    href,
    type = 'button',
    icon: Icon,
    ...props
}) {
    const baseStyles = "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-poppins font-medium transition-colors relative overflow-hidden group";

    const variants = {
        primary: "bg-[var(--color-accent-primary)] text-white hover:bg-[#684be6]",
        secondary: "bg-[var(--color-secondary)] text-white hover:bg-[#222222] border border-[var(--color-divider)]",
        outline: "bg-transparent text-[var(--color-accent-secondary)] border border-[var(--color-accent-secondary)] hover:bg-[var(--color-accent-secondary)] hover:text-black",
    };

    const classes = twMerge(clsx(baseStyles, variants[variant], className));

    const content = (
        <>
            <span className="relative z-10 flex items-center gap-2">
                {children}
                {Icon && <Icon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
            </span>
            {variant === 'primary' && (
                <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></span>
            )}
        </>
    );

    if (href) {
        // If it starts with http, it's an external link
        if (href.startsWith('http') || href.startsWith('mailto')) {
            return (
                <motion.a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={classes}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    {...props}
                >
                    {content}
                </motion.a>
            );
        }
        return (
            <Link to={href} className="inline-block">
                <motion.button
                    className={classes}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    tabIndex={-1}
                    {...props}
                >
                    {content}
                </motion.button>
            </Link>
        );
    }

    return (
        <motion.button
            type={type}
            onClick={onClick}
            className={classes}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            {...props}
        >
            {content}
        </motion.button>
    );
}
