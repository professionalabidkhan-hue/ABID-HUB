import streamlit as st

def show_student_dashboard(user_data):
    st.title(f"Welcome back, {user_data['name']}!")
    
    # Check course type to display relevant syllabus
    if user_data['course'] == "IT":
        st.header("💻 Your IT Learning Path")
        st.info("Current Module: Python Backend Development")
        st.video("https://www.youtube.com/watch?v=example1") # Link your intro video
        st.download_button("Download IT Syllabus", "it_syllabus.pdf")
        
    elif user_data['course'] == "Quran":
        st.header("📖 Your Quranic Studies")
        st.info("Current Lesson: Tajweed Rules - Al-Fatiha")
        st.video("https://www.youtube.com/watch?v=example2")
        st.download_button("Download Tajweed Guide", "quran_syllabus.pdf")

# Example Simulation
user = {"name": "Muhammad Abid", "course": "IT"}
show_student_dashboard(user)