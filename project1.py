
import os
print("Wellcome to robotic chatting dashboard")
x = input("Enter what you speak")
command = f"powershell -c Add-Type -AssemblyName System.Speech; (New-Object System.Speech.Synthesis.SpeechSynthesizer).Speak('{x}')"
os.system(command)

