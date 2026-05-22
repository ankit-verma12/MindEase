import { useState } from "react";

export default function TelegramSetup() {

    const [chatId, setChatId] = useState("");

    const [userName, setUserName] =
        useState("");

    const [contactName, setContactName] =
        useState("");

    const handleContinue = () => {

        // validate telegram id only if entered
        if (chatId.trim()) {

            if (!/^\d+$/.test(chatId)) {
                alert(
                    "Chat ID must contain only numbers"
                );
                return;
            }

            localStorage.setItem(
                "telegramChatId",
                chatId
            );
        }

        // save names
        localStorage.setItem(
            "userName",
            userName || "MindEase User"
        );

        localStorage.setItem(
            "emergencyContactName",
            contactName || "Trusted Contact"
        );

        // complete setup
        localStorage.setItem(
            "setupComplete",
            "true"
        );

        window.location.reload();
    };

    return (

        <div className="min-h-screen w-full bg-[linear-gradient(135deg,#09090f_0%,#111827_35%,#0f172a_100%)] flex items-center justify-center px-4 relative overflow-hidden">

            {/* Glow */}
            <div className="absolute top-[-8rem] left-[-5rem] w-[25rem] h-[25rem] rounded-full bg-violet-500/20 blur-3xl" />

            <div className="absolute bottom-[-10rem] right-[-5rem] w-[30rem] h-[30rem] rounded-full bg-emerald-400/10 blur-3xl" />

            {/* Card */}
            <div className="relative z-10 w-full max-w-[420px] bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 shadow-[0_10px_50px_rgba(0,0,0,0.45)]">

                {/* Heading */}
                <div className="text-center mb-8">

                    <h1 className="text-4xl font-semibold tracking-tight text-white">
                        MindEase
                    </h1>

                    <p className="text-slate-400 mt-3 text-sm leading-relaxed">
                        Connect Telegram for emergency alerts
                        and wellness notifications.
                    </p>

                </div>

                {/* Inputs */}
                <div className="space-y-4 mb-6">

                    <input
                        type="text"
                        placeholder="Your Name"
                        value={userName}
                        onChange={(e) =>
                            setUserName(
                                e.target.value
                            )
                        }
                        className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-5 py-4 outline-none text-white placeholder:text-slate-500"
                    />

                    <input
                        type="text"
                        placeholder="Trusted Contact Name"
                        value={contactName}
                        onChange={(e) =>
                            setContactName(
                                e.target.value
                            )
                        }
                        className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-5 py-4 outline-none text-white placeholder:text-slate-500"
                    />

                    <input
                        type="text"
                        placeholder="Telegram Chat ID (Optional)"
                        value={chatId}
                        onChange={(e) =>
                            setChatId(
                                e.target.value
                            )
                        }
                        className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-5 py-4 outline-none text-white placeholder:text-slate-500"
                    />

                </div>

                {/* Buttons */}
                <div className="flex flex-col gap-3">

                    <button
                        onClick={handleContinue}
                        className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-violet-600 text-white font-medium hover:opacity-90 transition-all duration-300"
                    >
                        Continue
                    </button>

                    <button
                        onClick={() => {

                            localStorage.setItem(
                                "setupComplete",
                                "true"
                            );

                            window.location.reload();
                        }}
                        className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 transition-all duration-300"
                    >
                        Continue Without Telegram
                    </button>

                </div>

                {/* Footer */}
                <p className="text-xs text-slate-500 mt-6 text-center leading-relaxed">
                    Telegram can always be connected later
                    from settings.
                </p>

            </div>

        </div>
    );
}