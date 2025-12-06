class Storage {
  constructor(key = 'notes') {
    this.key = key;
  }

  /**
   * 
   * Modelo de nota
   */
  buildNote({ title, summary, content, category }) {
    return {
      id: crypto.randomUUID(),
      title,
      summary,
      content,
      category,
      createdAt: new Date().toISOString(),
    };
  }

  /**
   * Retorna todas as notas
   * @returns {Array} Lista de notas
   */
  getAll() {
    try {
      return JSON.parse(localStorage.getItem(this.key) || '[]');
    } catch (error) {
      console.error('Erro ao carregar notas:', error)
      return [];
    }
  }

  /**
   * Salva uma nota
   * @param {Object} note - Nota a ser salva
   */
  save(note) {
    try {
      const notes = this.getAll();
      notes.push(note);
      localStorage.setItem(this.key, JSON.stringify(notes));
      return true;
    } catch (error) {
      console.error('Erro ao salvar nota:', error);
      return false;
    }
  }

  /**
   * Busca nota por ID
   * @param {string} id - ID da nota
   * @returns {Object|null} Nota encontrada ou null
   */
  findById(id) {
    return this.getAll().find(note => note.id === id) || null;
  }

  /**
   * Deleta uma nota
   * @param {string} id - ID da nota a deletar
   * @returns {boolean} True se deletado com sucesso
   */
  deleteNote(id) {
    const notes = this.getAll().filter(note => note.id !== id);
    localStorage.setItem(this.key, JSON.stringify(notes));
    return true;
  }


  /**
   * Atualiza uma nota existente
   * @param {string} id - ID da nota
   * @param {Object} updates - Campos a atualizar
   * @returns {boolean} True se atualizado com sucesso
   */
  update(id, updates) {
    const notes = this.getAll();
    const index = notes.findIndex(note => note.id === id);
    if (index === -1) return false;
    notes[index] = { ...notes[index], ...updates };
    localStorage.setItem(this.key, JSON.stringify(notes));
    return true;
  }

  /**
   * Limpa todas as notas
   */
  clear() {
    localStorage.removeItem(this.key);
  }
}

export const storage = new Storage();