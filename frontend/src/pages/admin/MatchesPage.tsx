import { useEffect, useState } from "react";
import {
  getAdminRounds,
  getMatchesByRound,
  getAdminTeams,
  createMatch,
  updateMatch,
  closeMatch,
  deleteMatch,
  getTipsForMatch,
  rescheduleMatch,
  getAdminUsers
} from "../../api/admin";

import type { MatchTip } from "../../types/MatchTip";
import type { Round } from "../../types/Round";
import type { AdminMatch } from "../../types/AdminMatch";
import type { User } from "../../types/User";

import "./MatchesPage.css";

interface Team {
  id: number;
  nazev: string;
}

function MatchesPage() {
  const [rounds, setRounds] = useState<Round[]>([]);

  const [matches, setMatches] = useState<AdminMatch[]>([]);

  const [selectedRoundId, setSelectedRoundId] = useState<number | null>(null);

  const [loading, setLoading] = useState(true);

  const [matchesLoading, setMatchesLoading] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const [editingMatchId, setEditingMatchId] = useState<number | null>(null);

  const [editHomeScore, setEditHomeScore] = useState("");

  const [editAwayScore, setEditAwayScore] = useState("");

  const [reschedulingMatchId, setReschedulingMatchId] = useState<number | null>(
    null,
  );

  const [rescheduleDate, setRescheduleDate] = useState("");

  const [rescheduleStatus, setRescheduleStatus] = useState<
    "scheduled" | "played" | "postponed"
  >("scheduled");

  const [tipsMatchId, setTipsMatchId] = useState<number | null>(null);

  const [tips, setTips] = useState<MatchTip[]>([]);

  const [tipsLoading, setTipsLoading] = useState(false);

  // =========================================================
  // New match form
  // =========================================================

  const [homeTeamId, setHomeTeamId] = useState("");

  const [awayTeamId, setAwayTeamId] = useState("");

  const [matchDate, setMatchDate] = useState("");

  const [teams, setTeams] = useState<Team[]>([]);

  const [users, setUsers] = useState<User[]>([]);


  // =========================================================
  // Loading
  // =========================================================

  async function loadInitialData() {
    try {
      setLoading(true);
      setError("");

      const [roundsData, teamsData, userData] = await Promise.all([
        getAdminRounds(),
        getAdminTeams(),
        getAdminUsers()
      ]);

      setRounds(roundsData);
      setTeams(teamsData);
      setUsers(userData);


      if (roundsData.length > 0) {
        setSelectedRoundId(roundsData[0].id);
      }
    } catch (error) {
      console.error(error);

      setError("Nepodařilo se načíst data.");
    } finally {
      setLoading(false);
    }
  }
  function getUsername(userId: number) {
    const user = users.find(
        user => user.id === userId
    );

    return user?.username ?? `Uživatel #${userId}`;
}
  async function loadMatches(roundId: number) {
    try {
      setMatchesLoading(true);
      setError("");

      const data = await getMatchesByRound(roundId);

      setMatches(data);
    } catch (error) {
      console.error(error);

      setError("Nepodařilo se načíst zápasy.");
    } finally {
      setMatchesLoading(false);
    }
  }

  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    if (selectedRoundId === null) {
      return;
    }

    loadMatches(selectedRoundId);
  }, [selectedRoundId]);

  // =========================================================
  // Date / time helpers
  // =========================================================

  function adjustMatchDate(days: number) {
    const date = matchDate ? new Date(matchDate) : new Date();

    if (Number.isNaN(date.getTime())) {
      return;
    }

    date.setDate(date.getDate() + days);

    const year = date.getFullYear();

    const month = String(date.getMonth() + 1).padStart(2, "0");

    const day = String(date.getDate()).padStart(2, "0");

    const hours = String(date.getHours()).padStart(2, "0");

    const minutes = String(date.getMinutes()).padStart(2, "0");

    setMatchDate(`${year}-${month}-${day}T${hours}:${minutes}`);
  }

  function setMatchTime(time: string) {
    const [hours, minutes] = time.split(":");

    const date = new Date(matchDate);

    if (Number.isNaN(date.getTime())) {
      return;
    }

    date.setHours(Number(hours), Number(minutes), 0, 0);

    const year = date.getFullYear();

    const month = String(date.getMonth() + 1).padStart(2, "0");

    const day = String(date.getDate()).padStart(2, "0");

    const newHours = String(date.getHours()).padStart(2, "0");

    const newMinutes = String(date.getMinutes()).padStart(2, "0");

    setMatchDate(`${year}-${month}-${day}T${newHours}:${newMinutes}`);
  }

  function toDateTimeLocal(value: string | null): string {
    if (!value) {
      return "";
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return "";
    }

    const year = date.getFullYear();

    const month = String(date.getMonth() + 1).padStart(2, "0");

    const day = String(date.getDate()).padStart(2, "0");

    const hours = String(date.getHours()).padStart(2, "0");

    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day}` + `T${hours}:${minutes}`;
  }

  // =========================================================
  // Create match
  // =========================================================

  async function handleCreateMatch(event: React.FormEvent) {
    event.preventDefault();

    if (selectedRoundId === null) {
      return;
    }

    if (!homeTeamId || !awayTeamId) {
      setError("Vyberte oba týmy.");

      return;
    }

    if (homeTeamId === awayTeamId) {
      setError("Domácí a hostující tým musí být rozdílný.");

      return;
    }

    try {
      setError("");
      setSuccess("");

      await createMatch({
        kolo_id: selectedRoundId,

        domaci_tym_id: Number(homeTeamId),

        hostujici_tym_id: Number(awayTeamId),

        zacatek_zapasu: matchDate,
      });

      setSuccess("Zápas byl vytvořen.");

      setHomeTeamId("");
      setAwayTeamId("");
      setMatchDate("");

      await loadMatches(selectedRoundId);
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error
          ? error.message
          : "Nepodařilo se vytvořit zápas.",
      );
    }
  }

  // =========================================================
  // Edit score
  // =========================================================

  function startEditing(match: AdminMatch) {
    setEditingMatchId(match.id);

    setEditHomeScore(match.domaci_skore?.toString() ?? "");

    setEditAwayScore(match.hostujici_skore?.toString() ?? "");

    setError("");
    setSuccess("");
  }

  function cancelEditing() {
    setEditingMatchId(null);

    setEditHomeScore("");
    setEditAwayScore("");
  }

  async function handleUpdateMatch(matchId: number) {
    if (editHomeScore === "" || editAwayScore === "") {
      setError("Vyplňte oba výsledky.");

      return;
    }

    try {
      setError("");
      setSuccess("");

      await updateMatch(matchId, Number(editHomeScore), Number(editAwayScore));

      setSuccess("Výsledek byl upraven.");

      cancelEditing();

      if (selectedRoundId !== null) {
        await loadMatches(selectedRoundId);
      }
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error ? error.message : "Nepodařilo se upravit zápas.",
      );
    }
  }

  // =========================================================
  // Reschedule
  // =========================================================

  function startRescheduling(match: AdminMatch) {
    setReschedulingMatchId(match.id);

    setRescheduleDate(toDateTimeLocal(match.zacatek_zapasu));

    setRescheduleStatus(match.stav === "played" ? "scheduled" : match.stav);

    setEditingMatchId(null);

    setError("");
    setSuccess("");
  }

  function cancelRescheduling() {
    setReschedulingMatchId(null);

    setRescheduleDate("");

    setRescheduleStatus("scheduled");
  }

  async function handleRescheduleMatch(matchId: number) {
    /*
     * Odložený zápas může mít datum NULL.
     *
     * Pokud je stav scheduled,
     * datum ale potřebujeme.
     */

    try {
      setError("");
      setSuccess("");

      const updatedMatch = await rescheduleMatch(
        matchId,
        rescheduleDate || null,
        rescheduleStatus,
      );

      setMatches((previous) =>
        previous.map((match) => (match.id === matchId ? updatedMatch : match)),
      );

      setSuccess(
        rescheduleStatus === "postponed"
          ? "Zápas byl odložen."
          : "Termín zápasu byl změněn.",
      );

      cancelRescheduling();
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error
          ? error.message
          : "Nepodařilo se změnit termín zápasu.",
      );
    }
  }

  // =========================================================
  // Close match
  // =========================================================

  async function handleCloseMatch(match: AdminMatch) {
    if (match.stav === "postponed") {
      setError("Odložený zápas nelze uzavřít. Nejdříve nastavte nový termín.");

      return;
    }

    const confirmed = window.confirm(
      "Opravdu chcete tento zápas uzavřít a vyhodnotit?",
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");
      setSuccess("");

      await closeMatch(match.id);

      setSuccess("Zápas byl uzavřen a vyhodnocen.");

      if (selectedRoundId !== null) {
        await loadMatches(selectedRoundId);
      }
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error ? error.message : "Nepodařilo se uzavřít zápas.",
      );
    }
  }

  // =========================================================
  // Delete match
  // =========================================================

  async function handleDeleteMatch(match: AdminMatch) {
    const confirmed = window.confirm("Opravdu chcete tento zápas smazat?");

    if (!confirmed) {
      return;
    }

    try {
      setError("");
      setSuccess("");

      await deleteMatch(match.id);

      setSuccess("Zápas byl smazán.");

      if (selectedRoundId !== null) {
        await loadMatches(selectedRoundId);
      }
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error ? error.message : "Nepodařilo se smazat zápas.",
      );
    }
  }

  // =========================================================
  // Tips
  // =========================================================

  async function handleShowTips(matchId: number) {
    if (tipsMatchId === matchId) {
      setTipsMatchId(null);
      setTips([]);

      return;
    }

    try {
      setTipsLoading(true);
      setError("");

      const data = await getTipsForMatch(matchId);

      setTips(data);
      setTipsMatchId(matchId);
    } catch (error) {
      console.error(error);

      setError("Nepodařilo se načíst tipy.");
    } finally {
      setTipsLoading(false);
    }
  }

  // =========================================================
  // Helpers
  // =========================================================

  function getTeamName(teamId: number) {
    const team = teams.find((team) => team.id === teamId);

    return team?.nazev ?? `Tým #${teamId}`;
  }

  function formatDate(value: string | null) {
    if (!value) {
      return "Termín není určen";
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return "Neplatné datum";
    }

    return date.toLocaleString("cs-CZ", {
      dateStyle: "short",
      timeStyle: "short",
    });
  }

  function getStatusLabel(status: AdminMatch["stav"]) {
    switch (status) {
      case "scheduled":
        return "Naplánováno";

      case "played":
        return "Odehráno";

      case "postponed":
        return "Odloženo";

      default:
        return status;
    }
  }

  // =========================================================
  // Loading
  // =========================================================

  if (loading) {
    return (
      <section className="matches-page">
        <h2>Zápasy</h2>

        <p>Načítání...</p>
      </section>
    );
  }

  // =========================================================
  // Render
  // =========================================================

  return (
    <section className="matches-page">
      {/* =================================================
                Header
                ================================================= */}

      <header className="matches-header">
        <div>
          <h2>Zápasy</h2>

          <p>Správa zápasů jednotlivých kol.</p>
        </div>

        <div className="round-selector">
          <label htmlFor="round">Kolo</label>

          <select
            id="round"
            value={selectedRoundId ?? ""}
            onChange={(event) => setSelectedRoundId(Number(event.target.value))}
          >
            {rounds.map((round) => (
              <option key={round.id} value={round.id}>
                {round.cislo_kola}
              </option>
            ))}
          </select>
        </div>
      </header>

      {/* =================================================
                Messages
                ================================================= */}

      {error && <div className="matches-message error">{error}</div>}

      {success && <div className="matches-message success">{success}</div>}

      {/* =================================================
                Create match
                ================================================= */}

      <div className="matches-create-card">
        <h3>Přidat zápas</h3>

        <form className="matches-create-form" onSubmit={handleCreateMatch}>
          <div>
  <label>Domácí tým</label>

  <select
    value={homeTeamId}
    onChange={(event) => setHomeTeamId(event.target.value)}
  >
    <option value="">Vyberte tým</option>

    {teams.map((team) => (
      <option key={team.id} value={team.id}>
        {team.nazev}
      </option>
    ))}
  </select>
</div>

          <div>
            <label>Hostující tým</label>

            <select
              value={awayTeamId}
              onChange={(event) => setAwayTeamId(event.target.value)}
            >
              <option value="">Vyberte tým</option>

              {teams.map((team) => (
                <option key={team.id} value={team.id}>
                  {team.nazev}
                </option>
              ))}
            </select>
          </div>

          {/* Date / time */}

          <div className="match-date-field">
            <label>Začátek</label>

            <div className="match-date-controls">
              <button
                type="button"
                className="date-step-button"
                onClick={() => adjustMatchDate(-1)}
              >
                −1 den
              </button>

              <input
                type="datetime-local"
                value={matchDate}
                onChange={(event) => setMatchDate(event.target.value)}
              />

              <button
                type="button"
                className="date-step-button"
                onClick={() => adjustMatchDate(1)}
              >
                +1 den
              </button>
            </div>

            <div className="quick-times">
              <span>Rychle:</span>

              <button type="button" onClick={() => setMatchTime("15:00")}>
                15:00
              </button>

              <button type="button" onClick={() => setMatchTime("17:00")}>
                17:00
              </button>

              <button type="button" onClick={() => setMatchTime("20:00")}>
                20:00
              </button>
            </div>
          </div>

          <button type="submit">Přidat zápas</button>
        </form>
      </div>

      {/* =================================================
                Match list
                ================================================= */}

      <div className="matches-list">
        {matchesLoading ? (
          <p>Načítání zápasů...</p>
        ) : matches.length === 0 ? (
          <div className="matches-empty">
            <h3>Žádné zápasy</h3>

            <p>Toto kolo zatím nemá žádné zápasy.</p>
          </div>
        ) : (
          matches.map((match) => (
            <article className="match-card" key={match.id}>
              {/* Match header */}

              <div className="match-main">
                <div className="match-teams">
                  <strong>{getTeamName(match.domaci_tym_id)}</strong>

                  <span>vs.</span>

                  <strong>{getTeamName(match.hostujici_tym_id)}</strong>
                </div>

                <div className="match-info">
                  <span>{formatDate(match.zacatek_zapasu)}</span>

                  <span className={`match-status ${match.stav}`}>
                    {getStatusLabel(match.stav)}
                  </span>
                </div>
              </div>

              {/* =================================================
                                    Reschedule editor
                                    ================================================= */}

              {reschedulingMatchId === match.id ? (
                <div className="match-reschedule">
                  <div>
                    <label>Nový termín</label>

                    <input
                      type="datetime-local"
                      value={rescheduleDate}
                      onChange={(event) =>
                        setRescheduleDate(event.target.value)
                      }
                    />
                  </div>

                  <div>
                    <label>Stav</label>

                    <select
                      value={rescheduleStatus}
                      onChange={(event) =>
                        setRescheduleStatus(
                          event.target.value as
                            | "scheduled"
                            | "played"
                            | "postponed",
                        )
                      }
                    >
                      <option value="scheduled">Naplánováno</option>

                      <option value="postponed">Odloženo</option>
                    </select>
                  </div>

                  <div className="match-reschedule-actions">
                    <button
                      type="button"
                      onClick={() => handleRescheduleMatch(match.id)}
                    >
                      Uložit
                    </button>

                    <button
                      type="button"
                      className="secondary-button"
                      onClick={cancelRescheduling}
                    >
                      Zrušit
                    </button>
                  </div>
                </div>
              ) : editingMatchId === match.id ? (
                /* =================================================
                                       Score editing
                                       ================================================= */

                <div className="match-edit">
                  <input
                    type="number"
                    min="0"
                    value={editHomeScore}
                    onChange={(event) => setEditHomeScore(event.target.value)}
                  />

                  <span>:</span>

                  <input
                    type="number"
                    min="0"
                    value={editAwayScore}
                    onChange={(event) => setEditAwayScore(event.target.value)}
                  />

                  <button
                    type="button"
                    onClick={() => handleUpdateMatch(match.id)}
                  >
                    Uložit výsledek
                  </button>

                  <button
                    type="button"
                    className="secondary-button"
                    onClick={cancelEditing}
                  >
                    Zrušit
                  </button>
                </div>
              ) : (
                /* =================================================
                                       Score display
                                       ================================================= */

                <div className="match-score">
                  {match.domaci_skore !== null &&
                  match.hostujici_skore !== null ? (
                    <>
                      <strong>{match.domaci_skore}</strong>

                      <span>:</span>

                      <strong>{match.hostujici_skore}</strong>
                    </>
                  ) : (
                    <span>– : –</span>
                  )}
                </div>
              )}

              {/* =================================================
                                    Actions
                                    ================================================= */}

              <div className="match-actions">
                {match.stav !== "postponed" && (
                  <button type="button" onClick={() => startEditing(match)}>
                    ✏️ Upravit
                  </button>
                )}

                <button type="button" className= "reschedule-button" onClick={() => startRescheduling(match)}>
                  📅 Změnit termín
                </button>

                <button type="button" onClick={() => handleShowTips(match.id)}>
                  👁 Tipy
                </button>

                {match.stav === "scheduled" && (
                  <button type="button" onClick={() => handleCloseMatch(match)}>
                    ✓ Uzavřít
                  </button>
                )}

                <button
                  type="button"
                  className="danger-button"
                  onClick={() => handleDeleteMatch(match)}
                >
                  🗑 Smazat
                </button>
              </div>

              {/* =================================================
                                    Tips
                                    ================================================= */}

              {tipsMatchId === match.id && (
                <div className="match-tips">
                  <h4>Tipy</h4>

                  {tipsLoading ? (
                    <p>Načítání tipů...</p>
                  ) : tips.length === 0 ? (
                    <p>Nikdo zatím netipoval.</p>
                  ) : (
                    <table>
                      <thead>
                        <tr>
                          <th>Uživatel</th>

                          <th>Tip</th>

                          <th>Body</th>

                          <th>Joker</th>
                        </tr>
                      </thead>

                      <tbody>
                        {tips.map((tip) => (
                          <tr key={tip.id}>
                            <td>{getUsername(tip.uzivatel_id)}</td>

                            <td>
                              {tip.predpoved_domaci_skore}
                              {" : "}
                              {tip.predpoved_hostujici_skore}
                            </td>

                            <td>{tip.body_ziskane}</td>

                            <td>{tip.is_joker ? "🃏" : "-"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              )}
            </article>
          ))
        )}
      </div>
    </section>
  );
}

export default MatchesPage;
