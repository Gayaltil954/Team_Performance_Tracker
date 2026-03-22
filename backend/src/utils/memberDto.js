export function toMemberDto(member) {
  return {
    _id: String(member._id),
    name: member.name,
    role: member.role,
    score: member.score,
    department: member.department || '',
    team: member.team || '',
    avatar: member.avatar || '',
    createdAt: member.createdAt,
    updatedAt: member.updatedAt,
  };
}
