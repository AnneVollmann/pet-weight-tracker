export default function WeightEntryPage() {
    return (
        <section>
            <h1>WeightEntryPage</h1>
            <form>
                <div>
                    <h2>Datum</h2>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="date" id="today" />
                        <label class="form-check-label" for="today">
                            Heute
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="date" id="selectDate" />
                        <label class="form-check-label" for="selectDate">
                            <button class="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Datum auswählen
                            </button>
                        </label>
                    </div>
                </div>
                <div>
                    <h2>Tiere</h2>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="pets" id="allPets" />
                        <label class="form-check-label" for="allPets">
                            Alle Tiere
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="pets" id="groupedPets" />
                        <label class="form-check-label" for="groupedPets">
                            <button class="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Eine Gruppe von Tieren
                            </button>
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="pets" id="specificPets" />
                        <label class="form-check-label" for="specificPets">
                            <button class="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Bestimmte Tiere
                            </button>
                        </label>
                    </div>
                </div>
            </form>
        </section>
    );
}