import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { defaultResumeData, defaultUI } from '../data/schema'

const genId = () => Math.random().toString(36).slice(2, 9)

export const useResumeStore = create(
  persist(
    (set) => ({
      resumeData: defaultResumeData,
      ui: defaultUI,

      // ── Personal ──────────────────────────────────────────────────────
      setPersonal: (field, value) =>
        set((s) => ({
          resumeData: {
            ...s.resumeData,
            personal: { ...s.resumeData.personal, [field]: value },
          },
        })),

      // ── Summary ───────────────────────────────────────────────────────
      setSummary: (value) =>
        set((s) => ({ resumeData: { ...s.resumeData, summary: value } })),

      // ── Experience ────────────────────────────────────────────────────
      addExperience: () =>
        set((s) => ({
          resumeData: {
            ...s.resumeData,
            experience: [
              ...s.resumeData.experience,
              { id: genId(), company: '', role: '', startDate: '', endDate: '', current: false, bullets: [''] },
            ],
          },
        })),
      updateExperience: (id, field, value) =>
        set((s) => ({
          resumeData: {
            ...s.resumeData,
            experience: s.resumeData.experience.map((e) =>
              e.id === id ? { ...e, [field]: value } : e
            ),
          },
        })),
      removeExperience: (id) =>
        set((s) => ({
          resumeData: {
            ...s.resumeData,
            experience: s.resumeData.experience.filter((e) => e.id !== id),
          },
        })),

      // ── Education ──────────────────────────────────────────────────────
      addEducation: () =>
        set((s) => ({
          resumeData: {
            ...s.resumeData,
            education: [
              ...s.resumeData.education,
              { id: genId(), institution: '', degree: '', field: '', startDate: '', endDate: '', gpa: '', gpaType: 'GPA' },
            ],
          },
        })),
      updateEducation: (id, field, value) =>
        set((s) => ({
          resumeData: {
            ...s.resumeData,
            education: s.resumeData.education.map((e) =>
              e.id === id ? { ...e, [field]: value } : e
            ),
          },
        })),
      removeEducation: (id) =>
        set((s) => ({
          resumeData: {
            ...s.resumeData,
            education: s.resumeData.education.filter((e) => e.id !== id),
          },
        })),

      // ── Skills ────────────────────────────────────────────────────────
      addSkillGroup: () =>
        set((s) => ({
          resumeData: {
            ...s.resumeData,
            skills: [...s.resumeData.skills, { id: genId(), category: '', items: [] }],
          },
        })),
      updateSkillGroup: (id, field, value) =>
        set((s) => ({
          resumeData: {
            ...s.resumeData,
            skills: s.resumeData.skills.map((sk) =>
              sk.id === id ? { ...sk, [field]: value } : sk
            ),
          },
        })),
      removeSkillGroup: (id) =>
        set((s) => ({
          resumeData: {
            ...s.resumeData,
            skills: s.resumeData.skills.filter((sk) => sk.id !== id),
          },
        })),

      // ── Projects ──────────────────────────────────────────────────────
      addProject: () =>
        set((s) => ({
          resumeData: {
            ...s.resumeData,
            projects: [
              ...s.resumeData.projects,
              { id: genId(), name: '', description: '', techStack: [], url: '' },
            ],
          },
        })),
      updateProject: (id, field, value) =>
        set((s) => ({
          resumeData: {
            ...s.resumeData,
            projects: s.resumeData.projects.map((p) =>
              p.id === id ? { ...p, [field]: value } : p
            ),
          },
        })),
      removeProject: (id) =>
        set((s) => ({
          resumeData: {
            ...s.resumeData,
            projects: s.resumeData.projects.filter((p) => p.id !== id),
          },
        })),

      // ── Certifications ────────────────────────────────────────────────
      addCertification: () =>
        set((s) => ({
          resumeData: {
            ...s.resumeData,
            certifications: [
              ...s.resumeData.certifications,
              { id: genId(), name: '', issuer: '', date: '' },
            ],
          },
        })),
      updateCertification: (id, field, value) =>
        set((s) => ({
          resumeData: {
            ...s.resumeData,
            certifications: s.resumeData.certifications.map((c) =>
              c.id === id ? { ...c, [field]: value } : c
            ),
          },
        })),
      removeCertification: (id) =>
        set((s) => ({
          resumeData: {
            ...s.resumeData,
            certifications: s.resumeData.certifications.filter((c) => c.id !== id),
          },
        })),

      // ── UI ────────────────────────────────────────────────────────────
      setUI: (field, value) =>
        set((s) => ({ ui: { ...s.ui, [field]: value } })),
      setSectionOrder: (order) =>
        set((s) => ({ ui: { ...s.ui, sectionOrder: order } })),

      // ── Persistence ───────────────────────────────────────────────────
      loadResume: (data) => set({ resumeData: data }),
      resetResume: () => set({ resumeData: defaultResumeData }),
    }),
    {
      name: 'resume-storage',
      partialize: (state) => ({ resumeData: state.resumeData, ui: state.ui }),
    }
  )
)
