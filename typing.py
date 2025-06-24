import tkinter as tk
import random

words = ["apple", "banana", "keyboard", "computer", "javascript", "programming", "github"]

class TypingGame:
    def __init__(self, root):
        self.root = root
        self.root.title("タイピングゲーム")
        self.score = 0

        self.word = tk.StringVar()
        self.entry = tk.Entry(root, font=("Arial", 24))
        self.entry.pack(pady=20)
        self.entry.bind("<Return>", self.check_word)

        self.word_label = tk.Label(root, textvariable=self.word, font=("Arial", 32))
        self.word_label.pack()

        self.result_label = tk.Label(root, text="", font=("Arial", 20))
        self.result_label.pack(pady=10)

        self.new_word()

    def new_word(self):
        self.word.set(random.choice(words))
        self.entry.delete(0, tk.END)
        self.result_label.config(text="")

    def check_word(self, event):
        typed = self.entry.get().strip()
        if typed == self.word.get():
            self.result_label.config(text="正解！")
        else:
            self.result_label.config(text="不正解…")
        self.root.after(1000, self.new_word)

if __name__ == "__main__":
    root = tk.Tk()
    game = TypingGame(root)
    root.mainloop()
