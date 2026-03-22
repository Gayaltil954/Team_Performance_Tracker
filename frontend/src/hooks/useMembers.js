import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  createMember,
  deleteMember,
  getMembers,
  updateMemberScore,
} from '../services/api';

export default function useMembers() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchMembers = useCallback(async ({ silent = false } = {}) => {
    try {
      if (!silent) {
        setLoading(true);
      }
      setError('');
      const data = await getMembers();
      setMembers(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch members');
    } finally {
      if (!silent) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchMembers({ silent: true });
    }, 5000);

    return () => clearInterval(intervalId);
  }, [fetchMembers]);

  const addMember = useCallback(async (memberPayload) => {
    try {
      setError('');
      const created = await createMember(memberPayload);
      setMembers((prev) => [created, ...prev]);
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to add member';
      setError(message);
      return { success: false, message };
    }
  }, []);

  const changeScore = useCallback(async (id, delta) => {
    try {
      setError('');
      const updated = await updateMemberScore(id, delta);
      setMembers((prev) => prev.map((member) => (member._id === id ? updated : member)));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update score');
    }
  }, []);

  const removeMember = useCallback(async (id) => {
    try {
      setError('');
      await deleteMember(id);
      setMembers((prev) => prev.filter((member) => member._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete member');
    }
  }, []);

  const sortTopPerformers = useCallback(() => {
    setMembers((prev) => [...prev].sort((a, b) => b.score - a.score));
  }, []);

  const hasMembers = useMemo(() => members.length > 0, [members]);

  return {
    members,
    loading,
    error,
    hasMembers,
    addMember,
    changeScore,
    removeMember,
    sortTopPerformers,
    refreshMembers: fetchMembers,
  };
}
