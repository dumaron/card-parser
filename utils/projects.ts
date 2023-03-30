import { Project, SerializedProject } from '../types'

export const serializeProject = (project: Project): SerializedProject => project.join('.')

export const deserializeProject = (project: SerializedProject): Project => project.split('.')
