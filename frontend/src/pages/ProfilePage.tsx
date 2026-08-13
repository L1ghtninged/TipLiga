import { useEffect, useState } from "react";

import { getProfile, updateSeasonPrediction } from "../api/profile";

import type { ProfileData } from "../types/Profile";

import "./ProfilePage.css";

function ProfilePage() {
  const [profile, setProfile] = useState<ProfileData | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [prediction, setPrediction] = useState<number[]>([]);

  const [savingPrediction, setSavingPrediction] = useState(false);

  const [predictionMessage, setPredictionMessage] = useState("");

  useEffect(() => {
    async function loadProfile() {
      try {
        setLoading(true);
        setError("");

        const data = await getProfile();

        setProfile(data);

        /*
         * Pokud už uživatel předpověď má,
         * použijeme ji jako výchozí pořadí.
         *
         * Pokud ji ještě nemá, použijeme
         * aktuální seznam týmů.
         */

        if (data.season_prediction.length > 0) {
          const sortedPrediction = [...data.season_prediction]
            .sort((a, b) => a.predpoved_pozice - b.predpoved_pozice)
            .map((prediction) => prediction.tym_id);

          setPrediction(sortedPrediction);
        } else {
          setPrediction(data.teams_table.map((team) => team.tym_id));
        }
      } catch (error) {
        console.error(error);

        setError("Nepodařilo se načíst profil.");
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  function movePrediction(index: number, direction: -1 | 1) {
    const newIndex = index + direction;

    if (newIndex < 0 || newIndex >= prediction.length) {
      return;
    }

    const updatedPrediction = [...prediction];

    const temporary = updatedPrediction[index];

    updatedPrediction[index] = updatedPrediction[newIndex];

    updatedPrediction[newIndex] = temporary;

    setPrediction(updatedPrediction);

    setPredictionMessage("");
  }

  function getTeam(teamId: number) {
    return profile?.teams_table.find((team) => team.tym_id === teamId);
  }

  async function handleSavePrediction() {
    if (!profile) {
      return;
    }

    if (prediction.length !== profile.teams_table.length) {
      setPredictionMessage("Předpověď musí obsahovat všechny týmy.");

      return;
    }

    const uniqueTeams = new Set(prediction);

    if (uniqueTeams.size !== prediction.length) {
      setPredictionMessage("Každý tým může být v pořadí pouze jednou.");

      return;
    }

    try {
      setSavingPrediction(true);
      setPredictionMessage("");

      await updateSeasonPrediction(prediction);

      /*
       * Aktualizujeme lokální data tak,
       * aby UI okamžitě odpovídalo uloženému stavu.
       */

      const updatedPrediction = prediction.map((teamId, index) => {
        const team = getTeam(teamId);

        return {
          tym_id: teamId,
          predpoved_pozice: index + 1,
          nazev: team?.nazev ?? "",
          logo_url: team?.logo_url ?? null,
          body_ziskane: 0,
        };
      });

      setProfile({
        ...profile,
        season_prediction: updatedPrediction,
      });

      setPredictionMessage("✓ Předpověď byla uložena.");
    } catch (error) {
      console.error(error);

      setPredictionMessage(
        error instanceof Error
          ? error.message
          : "Nepodařilo se uložit předpověď.",
      );
    } finally {
      setSavingPrediction(false);
    }
  }

  if (loading) {
    return (
      <section className="profile-page">
        <h2>Profil</h2>

        <p>Načítání profilu...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="profile-page">
        <h2>Profil</h2>

        <div className="profile-message error">{error}</div>
      </section>
    );
  }

  if (!profile) {
    return null;
  }

  return (
    <section className="profile-page">
      <div className="profile-header">
        <div>
          <h1>{profile.username}</h1>

          <p>Profil hráče</p>
        </div>
      </div>

      <div className="profile-stats">
        <div className="profile-stat">
          <span className="profile-stat-label">Body</span>

          <strong className="profile-stat-value">{profile.pocet_bodu}</strong>
        </div>

        <div className="profile-stat">
          <span className="profile-stat-label">Pořadí</span>

          <strong className="profile-stat-value">
            {profile.poradi !== null ? `${profile.poradi}.` : "—"}
          </strong>
        </div>
      </div>

      <section className="profile-section">
        <div className="profile-section-header">
          <h2>Tabulka ligy</h2>
        </div>

        <div className="profile-table-wrapper">
          <table className="profile-table">
            <thead>
              <tr>
                <th>#</th>

                <th>Tým</th>

                <th>Body</th>
              </tr>
            </thead>

            <tbody>
              {profile.teams_table.map((team) => (
                <tr key={team.tym_id}>
                  <td>{team.pozice}.</td>

                  <td>
                    <div className="profile-team">
                      {team.logo_url ? (
                        <img
                          className="profile-team-logo"
                          src={team.logo_url}
                          alt={`Logo ${team.nazev}`}
                        />
                      ) : (
                        <div className="profile-team-logo-placeholder">—</div>
                      )}

                      <span>{team.nazev}</span>
                    </div>
                  </td>

                  <td>
                    <strong>{team.body}</strong>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="profile-section">
        <div className="profile-section-header">
          <div>
            <h2>Moje předpověď</h2>

            {!profile.season_tips_locked && (
              <p className="profile-season-description">
                Seřaďte týmy podle toho, jak podle vás skončí na konci sezóny.
              </p>
            )}

            {!profile.season_tips_locked && (
              <span className="profile-season-status">Předpověď otevřená</span>
            )}

            {profile.season_tips_locked && !profile.season_ended && (
              <span className="profile-season-status locked">
                🔒 Předpověď uzamčena
              </span>
            )}

            {profile.season_ended && (
              <span className="profile-season-status ended">
                🏆 Sezóna skončena
              </span>
            )}
          </div>

          {!profile.season_ended && (
            <span className="profile-season-status">Sezóna probíhá</span>
          )}
        </div>

        {!profile.season_tips_locked ? (
          <div className="season-prediction-editor">
            <div className="season-prediction-info">
              <p>
                <strong>Vaše předpověď</strong>
              </p>

              <p>
                Pomocí šipek můžete týmy posouvat nahoru a dolů. První tým bude
                podle vaší předpovědi mistrem ligy.
              </p>
            </div>

            <div className="season-prediction-list">
              {prediction.map((teamId, index) => {
                const team = getTeam(teamId);

                if (!team) {
                  return null;
                }

                return (
                  <div className="season-prediction-row" key={teamId}>
                    <div className="season-prediction-position">
                      {index + 1}.
                    </div>

                    <div className="season-prediction-team">
                      {team.logo_url ? (
                        <img
                          src={team.logo_url}
                          alt={`Logo ${team.nazev}`}
                          className="profile-team-logo"
                        />
                      ) : (
                        <div className="profile-team-logo-placeholder">—</div>
                      )}

                      <span>{team.nazev}</span>
                    </div>

                    <div className="season-prediction-controls">
                      <button
                        type="button"
                        className="season-prediction-move-button"
                        disabled={index === 0 || savingPrediction}
                        onClick={() => movePrediction(index, -1)}
                        title="Posunout nahoru"
                      >
                        ↑
                      </button>

                      <button
                        type="button"
                        className="season-prediction-move-button"
                        disabled={
                          index === prediction.length - 1 || savingPrediction
                        }
                        onClick={() => movePrediction(index, 1)}
                        title="Posunout dolů"
                      >
                        ↓
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {predictionMessage && (
              <div
                className={
                  predictionMessage.startsWith("✓")
                    ? "profile-message success"
                    : "profile-message error"
                }
              >
                {predictionMessage}
              </div>
            )}

            <div className="season-prediction-actions">
              <button
                type="button"
                className="season-prediction-save-button"
                disabled={savingPrediction}
                onClick={handleSavePrediction}
              >
                {savingPrediction ? "Ukládám..." : "💾 Uložit předpověď"}
              </button>
            </div>
          </div>
        ) : profile.season_prediction.length === 0 ? (
          <div className="profile-empty">Předpověď umístění nebyla zadána.</div>
        ) : (
          <div className="profile-table-wrapper">
            <table className="profile-table">
              <thead>
                <tr>
                  <th>Předpověď</th>

                  <th>Tým</th>

                  <th>Body</th>
                </tr>
              </thead>

              <tbody>
                {[...profile.season_prediction]
                  .sort((a, b) => a.predpoved_pozice - b.predpoved_pozice)
                  .map((prediction) => (
                    <tr key={prediction.tym_id}>
                      <td>
                        <strong>{prediction.predpoved_pozice}.</strong>
                      </td>

                      <td>
                        <div className="profile-team">
                          {prediction.logo_url ? (
                            <img
                              className="profile-team-logo"
                              src={prediction.logo_url}
                              alt={`Logo ${prediction.nazev}`}
                            />
                          ) : (
                            <div className="profile-team-logo-placeholder">
                              —
                            </div>
                          )}

                          <span>{prediction.nazev}</span>
                        </div>
                      </td>

                      <td>
                        <strong>{prediction.body_ziskane}</strong>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}

        {profile.season_ended && (
          <div className="profile-season-points">
            Body za předpověď sezóny:
            <strong>{profile.pocet_bodu_sezona}</strong>
          </div>
        )}
      </section>
    </section>
  );
}

export default ProfilePage;
